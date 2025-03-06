import { Stack } from 'expo-router';
import { AuthProvider } from './context/AuthContext';
import { AuthWrapper } from './components/AuthWrapper';

export default function RootLayout() {
    return (
        <AuthProvider>
            <AuthWrapper>
                <Stack screenOptions={{ headerShown: false }} />
            </AuthWrapper>
        </AuthProvider>
    );
}