import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import mainStyle from '@/style/main.style';

const Account = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            router.replace('/(auth)/login');
        } catch (error) {
            console.error('Logout error:', error);
            Alert.alert('Logout Error', 'An error occurred during logout.');
        }
    };

    return (
        <View style={mainStyle.container}>
            <Text style={mainStyle.title}>Account</Text>
            <TouchableOpacity style={mainStyle.button} onPress={handleLogout}>
                <Text style={mainStyle.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Account;