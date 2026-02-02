"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Dashboard' },
        { href: '/orders', label: 'Orders' },
        { href: '/settings', label: 'Settings' },
    ];

    return (
        <div className="w-64 h-full bg-slate-900 text-white flex flex-col p-4">
            <h1 className="text-2xl font-bold mb-8">OrderSphere</h1>
            <nav className="flex-1 space-y-2">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`block p-3 rounded hover:bg-slate-800 ${pathname === link.href ? 'bg-slate-800' : ''
                            }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
