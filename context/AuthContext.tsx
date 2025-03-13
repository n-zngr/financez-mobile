import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
    token: string | null;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>("dummy-token");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await AsyncStorage.getItem("token");
            console.log("🔍 Loaded Token:", storedToken); // Debug log
            if (storedToken) setToken(storedToken);
            setLoading(false);
        };
        loadToken();
    }, []);
    

    const login = async (token: string) => {
        console.log("✅ Storing Token:", token); // ✅ Debug log
        await AsyncStorage.setItem("token", token);
        setToken(token);
    };

    const logout = async () => {
        console.log("🚪 Logging out, removing token"); // ✅ Debug log
        await AsyncStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
