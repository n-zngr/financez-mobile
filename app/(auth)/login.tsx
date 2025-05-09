import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import mainStyle from '@/style/main.style';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await fetch(`https://financez-v0.vercel.app/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            console.log(data);
    
            if (response.ok) {
                await AsyncStorage.setItem('userToken', data.userId);
                router.replace('/(tabs)');
            } else {
                Alert.alert('Login Failed', data.error);
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login Error', 'An error occurred during login.');
        }
    };

    return (
        <View style={mainStyle.container}>
            <Text style={mainStyle.title}>Login</Text>
            <TextInput
                style={mainStyle.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={mainStyle.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={mainStyle.button} onPress={handleLogin}>
                <Text style={mainStyle.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={mainStyle.button} onPress={() => router.push('/(auth)/signup')}>
                <Text style={mainStyle.buttonText}>Signup</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login;