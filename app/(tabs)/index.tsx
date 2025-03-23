import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Modal, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditScreenInfo from '@/components/EditScreenInfo';
import { useRouter } from 'expo-router';
import mainStyle from '@/style/main.style';
import transactionStyle from '@/style/transactions.style';

interface Transaction {
    _id: string;
    userId: string;
    name: string;
    type: 'income' | 'expense';
    amount: number;
    createdAt: Date;
}

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTransaction, setNewTransaction] = useState({ name: '', type: 'expense', amount: '' });
    const router = useRouter();

    useEffect(() => {
        loadTransactions();
    }, [])

    const loadTransactions = async () => {
        try {
            const userId = await AsyncStorage.getItem('userToken');

            if (userId) {
                const response = await fetch(`https://financez-v0.vercel.app/api/transactions?userId=${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setTransactions(data);
                } else {
                    Alert.alert('Error', 'Failed to load transactions.');
                }
            }
        } catch (error) {
            console.error('Error loading transactions:', error);
            Alert.alert('Error', 'An error occurred while loading transactions.');
        }
    };

    const addTransaction = async () => {
        try {
            const userId = await AsyncStorage.getItem('userToken');
            if (userId) {
                const response = await fetch('https://financez-v0.vercel.app/api/transactions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId, ...newTransaction })
                });

                if (response.ok) {
                    Alert.alert('Success', 'Transaction added successfully');
                    setModalVisible(false);
                    setNewTransaction({ name: '', type: 'expense', amount: '' });
                    loadTransactions();
                } else {
                    Alert.alert('Error', 'Failed to add transaction.');
                }
            }
        } catch (error) {
            console.error('Error adding transaction: ', error);
            Alert.alert('Error', 'An error occurred while adding transaction.');
        }
    };
    
    return (
        <View style={transactionStyle.container}>
            <Text style={transactionStyle.title}>Transactions</Text>
            <Button title="Add Transaction" onPress={() => setModalVisible(true)} />

            {transactions.length === 0 ? (
                <View style={transactionStyle.noTransactions}>
                    <Text style={mainStyle.text}>Create a transaction to view Transactions</Text>
                </View>
            ) : (
                <FlatList
                    data={transactions}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <View style={transactionStyle.transactionItem}>
                            <Text style={mainStyle.text}>{item.name}</Text>
                            <Text style={mainStyle.text}>{item.type}</Text>
                            <Text style={mainStyle.text}>${item.amount.toFixed(2)}</Text>
                        </View>
                    )}
                />
            )}

            <Modal visible={modalVisible} animationType="slide">
                <View style={transactionStyle.modalContainer}>
                    <Text style={transactionStyle.modalTitle}>Add New Transaction</Text>
                    <TextInput
                        style={transactionStyle.input}
                        placeholder="Name"
                        value={newTransaction.name}
                        onChangeText={(text) => setNewTransaction({ ...newTransaction, name: text })}
                    />
                    <TextInput
                        style={transactionStyle.input}
                        placeholder="Amount"
                        value={newTransaction.amount}
                        onChangeText={(text) => setNewTransaction({ ...newTransaction, amount: text })}
                        keyboardType="numeric"
                    />
                    <View style={transactionStyle.typeButtons}>
                        <TouchableOpacity style={[transactionStyle.typeButton, newTransaction.type === 'expense' && transactionStyle.selectedType]} onPress={() => setNewTransaction({ ...newTransaction, type: 'expense' })}>
                            <Text>Expense</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[transactionStyle.typeButton, newTransaction.type === 'income' && transactionStyle.selectedType]} onPress={() => setNewTransaction({ ...newTransaction, type: 'income' })}>
                            <Text>Income</Text>
                        </TouchableOpacity>
                    </View>
                    <Button title="Add" onPress={addTransaction} />
                    <Button title="Cancel" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
}