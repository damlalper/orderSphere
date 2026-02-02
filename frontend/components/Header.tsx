"use client";

import { useAuth } from '@/context/AuthContext';

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
            <h2 className="text-xl font-semibold text-gray-800">Workspace</h2>
            <div className="flex items-center gap-4">
                {user && (
                    <span className="text-sm text-gray-600">
                        {user.email} ({user.role})
                    </span>
                )}
                <button
                    onClick={logout}
                    className="text-sm text-red-600 hover:text-red-800"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}
