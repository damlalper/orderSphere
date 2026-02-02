"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import api from '@/lib/api';

interface User {
    email: string;
    role: string;
    sub: number;
}

interface AuthContextType {
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = Cookies.get('token');
        const userData = Cookies.get('user');

        if (token && userData) {
            setUser(JSON.parse(userData));
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!isLoading && !user && pathname !== '/login' && pathname !== '/register') {
            router.push('/login');
        }
    }, [user, isLoading, pathname, router]);

    const login = (token: string, userData: User) => {
        Cookies.set('token', token);
        Cookies.set('user', JSON.stringify(userData));
        setUser(userData);
        router.push('/');
    };

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
