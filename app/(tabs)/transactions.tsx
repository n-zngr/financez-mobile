import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import AddTransactionModal from '@/components/transactions/AddTransactionModal';
import tw from 'twrnc';

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
        <View style={tw`flex-1 p-5 bg-gray-100`}>
      <View style={tw`items-center mb-5`}>
        <Text style={tw`text-2xl font-bold`}>Total Budget: ${budget.toFixed(2)}</Text>
      </View>

      <ScrollView style={tw`flex-1`}>
        {transactions.map((transaction) => (
          <View
            key={transaction.id}
            style={tw`flex-row justify-between p-3 border-b border-gray-300 bg-white`}
          >
            <Text style={tw`text-lg`}>{transaction.name}</Text>
            <Text style={tw`text-lg font-bold`}>
              {transaction.type === 'income' ? '+' : '-'} ${transaction.amount.toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={tw`absolute bottom-5 right-5 bg-blue-500 w-14 h-14 rounded-full items-center justify-center shadow-lg`}
        onPress={() => setModalVisible(true)}
      >
        <Text style={tw`text-white text-4xl font-bold`}>+</Text>
      </TouchableOpacity>

      <AddTransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddTransaction}
      />
    </View>
    );
};
