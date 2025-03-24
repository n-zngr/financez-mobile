import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, Image, TextInput, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import transactionStyle from '@/style/transactions.style';
import { Transaction } from '@/app/(tabs)';
import mainStyle from '@/style/main.style';

interface EditTransactionProps {
    transactionId: string;
    onTransactionUpdated: () => void;
}

export default function EditTransaction({ transactionId, onTransactionUpdated }: EditTransactionProps) {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [editedAmount, setEditedAmount] = useState('');
    const [editedType, setEditedType] = useState<'income' | 'expense'>('expense');
    const [editedName, setEditedName] = useState('');
    const [receiptImage, setReceiptImage] = useState<string | null>(null);

    useEffect(() => {
        loadTransaction();
    }, [transactionId]);

    const loadTransaction = async () => {
        try {
            const userId = await AsyncStorage.getItem('userToken');
            if (userId && transactionId) {
                const response = await fetch(`https://financez-v0.vercel.app/api/transactions?userId=${userId}`);
                if (response.ok) {
                    const data: Transaction[] = await response.json();
                    const foundTransaction = data.find((item) => item._id === transactionId);
                    if (foundTransaction) {
                        setTransaction(foundTransaction);
                        setEditedAmount(foundTransaction.amount.toString());
                        setEditedType(foundTransaction.type);
                        setEditedName(foundTransaction.name);
                        if (foundTransaction.receiptFileId) {
                            fetchReceiptImage(foundTransaction.receiptFileId.toString());
                        }
                    } else {
                        Alert.alert('Error', 'Transaction not found.');
                    }
                } else {
                    Alert.alert('Error', 'Failed to load transactions.');
                }
            }
        } catch (error) {
            console.error('Error loading transaction:', error);
            Alert.alert('Error', 'An error occurred while loading transaction.');
        }
    };

    const fetchReceiptImage = async (fileId: string) => {
        try {
            const response = await fetch(`https://financez-v0.vercel.app/api/receipts?fileId=${fileId}`);
            if (response.ok) {
                const blob = await response.blob();
                const imageUri = URL.createObjectURL(blob);
                setReceiptImage(imageUri);
            } else {
                console.error('Failed to fetch receipt image.');
            }
        } catch (error) {
            console.error('Error fetching receipt image:', error);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const uploadReceipt = async () => {
        if (!selectedImage) {
            Alert.alert('Please take a receipt image first.');
            return;
        }

        try {
            const userId = await AsyncStorage.getItem('userToken');
            if (!userId) {
                Alert.alert('User not logged in.');
                return;
            }

            const response = await fetch(selectedImage);
            const blob = await response.blob();
            const fileName = `receipt_${transactionId}.jpg`;

            const formData = new FormData();
            formData.append('receipt', blob, fileName);
            formData.append('userId', userId);
            formData.append('transactionId', String(transactionId));
            formData.append('fileName', fileName);

            const uploadResponse = await fetch('https://financez-v0.vercel.app/api/receipts', {
                method: 'POST',
                body: formData,
            });

            if (uploadResponse.ok) {
                const receiptData = await uploadResponse.json();
                const newReceiptFileId = receiptData.fileId;

                await updateTransactionReceipt(newReceiptFileId);

                Alert.alert('Receipt uploaded successfully!');
                router.push('/');
            } else {
                Alert.alert('Failed to upload receipt.');
            }
        } catch (error) {
            console.error('Upload error: ', error);
            Alert.alert('An error occurred during upload.');
        }
    };

    const updateTransactionReceipt = async (receiptFileId: string) => {
        try {
            const response = await fetch(`https://financez-v0.vercel.app/api/transactions/put?transactionId=${transactionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    receiptFileId: receiptFileId,
                }),
            });

            if (response.ok) {
                console.log('Transaction receipt updated successfully.');
            } else {
                console.error('Failed to update transaction receipt.');
            }
        } catch (error) {
            console.error('Error updating transaction receipt:', error);
        }
    };
    
    const saveChanges = async () => {
        try {
            if (transactionId && transaction) {
                const response = await fetch(`https://financez-v0.vercel.app/api/transactions/put?transactionId=${transactionId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: editedName,
                        type: editedType,
                        amount: parseFloat(editedAmount),
                    }),
                });

                if (response.ok) {
                    Alert.alert('Success', 'Transaction updated successfully!');
                    onTransactionUpdated();
                } else {
                    const errorData = await response.json();
                    Alert.alert('Error', `Failed to update transaction: ${errorData.error || 'Unknown error'}`);
                }
            }
        } catch (error) {
            console.error('Error updating transaction:', error);
            Alert.alert('Error', 'An error occurred while updating transaction.');
        }
    };

    if (!transaction) {
        return (
            <Text style={mainStyle.text}>Loading...</Text>
        );
    }


    return (
        <View style={transactionStyle.modalContainer}>
            <Text style={transactionStyle.modalTitle}>Edit Transaction {transactionId}</Text>

            <TextInput
                style={transactionStyle.input}
                placeholder="Name"
                value={editedName}
                onChangeText={setEditedName}
            />

            <TextInput
                style={transactionStyle.input}
                placeholder="Amount"
                value={editedAmount}
                onChangeText={setEditedAmount}
                keyboardType="numeric"
            />

            <View style={transactionStyle.typeButtons}>
                <TouchableOpacity
                    style={[transactionStyle.typeButton, editedType === 'expense' && transactionStyle.selectedType]}
                    onPress={() => setEditedType('expense')}
                >
                    <Text>Expense</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[transactionStyle.typeButton, editedType === 'income' && transactionStyle.selectedType]}
                    onPress={() => setEditedType('income')}
                >
                    <Text>Income</Text>
                </TouchableOpacity>
            </View>

            <Button title="Take Image" onPress={pickImage} />
            {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
            <Button title="Upload Receipt" onPress={uploadReceipt} />

            {receiptImage && (
                <View>
                    <Text style={{ color: 'white' }}>Current Receipt:</Text>
                    <Image source={{ uri: receiptImage }} style={{ width: 200, height: 200 }} />
                </View>
            )}

            <Button title="Save Changes" onPress={saveChanges} />
        </View>
    );
}
