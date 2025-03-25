import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import mainStyle from '@/style/main.style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Signup = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const handleSignup = async () => {
        try {
            const response = await fetch(`https://financez-v0.vercel.app/api/users/signup`, {
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
        <View style={[mainStyle.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <Text style={mainStyle.title}>Signup</Text>
            <TextInput
                style={mainStyle.input}
                placeholder="Full Name"
                value={fullname}
                onChangeText={setFullname}
            />
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
            <TextInput
                style={mainStyle.input}
                placeholder="Country"
                value={country}
                onChangeText={setCountry}
            />
            <TouchableOpacity style={mainStyle.button} onPress={handleSignup}>
                <Text style={mainStyle.buttonText}>Signup</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Signup;