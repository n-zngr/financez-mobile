import React from 'react';
import tw from 'twrnc';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface AddTransactionModalProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (type: 'income' | 'expense', amount: string, name: string) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ visible, onClose, onAdd }) => {
    const [newTransactionType, setNewTransactionType] = React.useState<'income' | 'expense'>('expense');
    const [newTransactionAmount, setNewTransactionAmount] = React.useState('');
    const [newTransactionName, setNewTransactionName] = React.useState('');

    const handleAdd = () => {
        onAdd(newTransactionType, newTransactionAmount, newTransactionName);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={tw`flex-1 justify-center items-center mt-5`}>
                <View style={tw`m-5 bg-white rounded-2xl p-8 items-center shadow-lg w-80`}>
                <Picker
                    selectedValue={newTransactionType}
                    style={tw`h-10 border border-gray-400 mb-2 bg-white w-52`}
                    onValueChange={(itemValue) =>
                    setNewTransactionType(itemValue as 'income' | 'expense')
                    }
                >
                    <Picker.Item label="Expense" value="expense" />
                    <Picker.Item label="Income" value="income" />
                </Picker>

                <TextInput
                    style={tw`h-10 border border-gray-400 mb-2 p-2 bg-white w-52`}
                    placeholder="Amount"
                    keyboardType="numeric"
                    value={newTransactionAmount}
                    onChangeText={setNewTransactionAmount}
                />

                <TextInput
                    style={tw`h-10 border border-gray-400 mb-2 p-2 bg-white w-52`}
                    placeholder="Transaction Name"
                    value={newTransactionName}
                    onChangeText={setNewTransactionName}
                />

                <TouchableOpacity
                    style={tw`bg-blue-500 p-2 rounded-md items-center mt-2 w-24`}
                    onPress={handleAdd}
                >
                    <Text style={tw`text-white font-bold`}>Add</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={tw`bg-gray-400 p-2 rounded-md items-center mt-2 w-24`}
                    onPress={onClose}
                >
                    <Text style={tw`text-white font-bold`}>Cancel</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );    
}

export default AddTransactionModal;