import { View, Text, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
    const { logout } = useAuth();
    const router = useRouter();

    return (
        <View>
            <Text>Dashboard</Text>
            <Button title="Logout" onPress={() => { logout(); router.replace('/(auth)/login'); }} />
        </View>
    );
}