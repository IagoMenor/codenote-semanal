'use client';
import { useState } from 'react';
import { authClient } from "../../lib/auth-client"; 
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cargando, setCargando] = useState(false);
    const router = useRouter();

    async function handleLogin(e) {
        e.preventDefault();
        setCargando(true);
        const { data, error } = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/dashboard",
        });

        if (error) {
            alert("Credenciales incorrectas o error de conexión");
            setCargando(false);
        } else {
            router.push('/dashboard');
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">Iniciar Sesión</h1>
                <div className="space-y-4">
                    <input 
                        type="email" placeholder="Tu email" 
                        className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => setEmail(e.target.value)} required 
                    />
                    <input 
                        type="password" placeholder="Contraseña" 
                        className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => setPassword(e.target.value)} required 
                    />
                    <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
                        {cargando ? 'Entrando...' : 'Entrar'}
                    </button>
                </div>
                <p className="mt-6 text-center text-sm text-gray-500">
                    ¿No tienes cuenta? <Link href="/register" className="text-indigo-600 font-bold hover:underline">Regístrate</Link>
                </p>
            </form>
        </main>
    );
}