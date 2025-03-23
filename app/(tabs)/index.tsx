import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Modal, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditScreenInfo from '@/components/EditScreenInfo';
import { useRouter } from 'expo-router';

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
        <View style={styles.container}>
            <Text style={styles.title}>Transactions</Text>
            <Button title="Add Transaction" onPress={() => setModalVisible(true)} />

            {transactions.length === 0 ? (
                <View style={styles.noTransactions}>
                    <Text>Create a transaction to view Transactions</Text>
                </View>
            ) : (
                <FlatList
                    data={transactions}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.transactionItem}>
                            <Text>{item.name}</Text>
                            <Text>{item.type}</Text>
                            <Text>${item.amount.toFixed(2)}</Text>
                        </View>
                    )}
                />
            )}

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Add New Transaction</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={newTransaction.name}
                        onChangeText={(text) => setNewTransaction({ ...newTransaction, name: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        value={newTransaction.amount}
                        onChangeText={(text) => setNewTransaction({ ...newTransaction, amount: text })}
                        keyboardType="numeric"
                    />
                    <View style={styles.typeButtons}>
                        <TouchableOpacity style={[styles.typeButton, newTransaction.type === 'expense' && styles.selectedType]} onPress={() => setNewTransaction({ ...newTransaction, type: 'expense' })}>
                            <Text>Expense</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.typeButton, newTransaction.type === 'income' && styles.selectedType]} onPress={() => setNewTransaction({ ...newTransaction, type: 'income' })}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    transactionItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    typeButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    typeButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    selectedType: {
        backgroundColor: 'lightblue',
    },
    noTransactions: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});