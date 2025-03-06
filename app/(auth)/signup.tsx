import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
    const router = useRouter();

    return (
        <View>
            <Text>Signup Screen</Text>
            <Button title="Go to Login" onPress={() => router.push('/(auth)/login')} />
        </View>
    );
}