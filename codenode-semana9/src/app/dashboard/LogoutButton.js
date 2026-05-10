'use client';
import { authClient } from "../../lib/auth-client";
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        await authClient.signOut();
        router.push('/login');
    }

    return (
        <button 
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-bold hover:bg-red-100 transition-colors"
        >
            Cerrar sesión segura
        </button>
    );
}