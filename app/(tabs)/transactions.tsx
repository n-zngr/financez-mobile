import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AddTransactionModal from '@/components/transactions/AddTransactionModal';

interface Transaction {
    id: string;
    name: string;
    type: 'income' | 'expense';
    amount: number;
}


export default function Transactions() {
    const [budget, setBudget] = useState(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
  
    const handleAddTransaction = (type: 'income' | 'expense', amount: string, name: string) => {
        if (amount && name) {
            const parsedAmount = parseFloat(amount);
            const newTransaction: Transaction = {
                id: String(Date.now()),
                type: type,
                amount: parsedAmount,
                name: name,
            };
    
            setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
            if (type === 'income') {
                setBudget((prevBudget) => prevBudget + parsedAmount);
            } else {
                setBudget((prevBudget) => prevBudget - parsedAmount);
            }
            setModalVisible(false);
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.budgetContainer}>
                <Text style={styles.budgetText}>Total Budget: ${budget.toFixed(2)}</Text>
            </View>
        
            <ScrollView style={styles.transactionList}>
                {transactions.map((transaction) => (
                <View key={transaction.id} style={styles.transactionItem}>
                    <Text style={styles.transactionName}>{transaction.name}</Text>
                    <Text style={styles.transactionAmount}>
                    {transaction.type === 'income' ? '+' : '-'} ${transaction.amount.toFixed(2)}
                    </Text>
                </View>
                ))}
            </ScrollView>
        
            <TouchableOpacity
                style={styles.addButtonBottom}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonBottomText}>+</Text>
            </TouchableOpacity>
        
            <AddTransactionModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onAdd={handleAddTransaction}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    budgetContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    budgetText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    transactionList: {
        flex: 1,
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'white',
    },
    transactionName: {
        fontSize: 16,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    addButtonBottom: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'blue',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    addButtonBottomText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        width: 200,
    },
    picker: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor: 'white',
        width: 200,
    },
    addButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width: 100,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width: 100,
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});