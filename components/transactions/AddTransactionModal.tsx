import React from 'react';
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
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Picker
                        selectedValue={newTransactionType}
                        style={styles.picker}
                        onValueChange={(itemValue) => setNewTransactionType(itemValue as 'income' | 'expense')}
                    >
                        <Picker.Item label="Expense" value="expense" />
                        <Picker.Item label="Income" value="income" />
                    </Picker>
            
                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        keyboardType="numeric"
                        value={newTransactionAmount}
                        onChangeText={setNewTransactionAmount}
                    />
            
                    <TextInput
                        style={styles.input}
                        placeholder="Transaction Name"
                        value={newTransactionName}
                        onChangeText={setNewTransactionName}
                    />
            
                    <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
            
                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
    
}

const styles = StyleSheet.create({
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
  
export default AddTransactionModal;