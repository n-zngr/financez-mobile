import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '@/style/style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DEV_IP = process.env.DEV_IP;

const Signup = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const handleSignup = async () => {
        try {
            const response = await fetch (`http://${DEV_IP}:3000/api/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullname, email, password, country })
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Signup Successful', data.message);
                router.push('/(auth)/login');
            } else {
                Alert.alert('Signup Failed', data.error);
            }
        } catch (error) {
            console.error('Signup error:', error);
            Alert.alert('Signup Error', 'An error occurred during signup.');
        }
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <Text style={styles.title}>Signup</Text>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullname}
                onChangeText={setFullname}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Country"
                value={country}
                onChangeText={setCountry}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Signup;