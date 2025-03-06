import { useAuth } from './context/AuthContext';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

export default function HomeScreen() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace('/(tabs)/dashboard');
        } else {
            router.replace('/(auth)/login');
        }
    }, [user]);

    return (
        <View>
            <Text>Loading...</Text>
        </View>
    );
}