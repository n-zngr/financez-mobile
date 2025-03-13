import { View, Text, Button } from 'react-native';
// import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
//    const { login } = useAuth();
    const router = useRouter();
/*
    return (
        <View>
            <Text>Login Screen</Text>
            <Button title="Sign In" onPress={() => { login({ name: 'User' }); router.replace('/(tabs)/dashboard'); }} />
            <Button title="Sign Up" onPress={() => router.push('/(auth)/signup')} />
        </View>
    );*/
}