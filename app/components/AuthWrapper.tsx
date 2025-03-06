import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!user && segments[0] !== '(auth)') {
      router.replace('/(auth)/login');
    }
  }, [user, segments]);

  return <>{children}</>;
}