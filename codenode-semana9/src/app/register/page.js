'use client'; // Necesario para usar estados (useState) y botones
import { useState } from 'react';
import { authClient } from "../../lib/auth-client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    // Definimos los estados para capturar lo que escribe el usuario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [cargando, setCargando] = useState(false);
    
    const router = useRouter();

    async function handleRegister(e) {
        e.preventDefault();
        setCargando(true);

        // Llamada a Better-Auth para crear el usuario
        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name,
            callbackURL: "/dashboard", // A donde irá si todo sale bien
        });

        if (error) {
            alert("Error: " + error.message);
            setCargando(false);
        } else {
            // Si el registro es éxito, vamos al dashboard
            router.push('/dashboard');
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <h1 className="text-3xl font-extrabold mb-2 text-center text-indigo-700">Crear cuenta</h1>
                <p className="text-gray-500 text-center mb-8 text-sm">Regístrate para gestionar tus proyectos</p>

                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre completo</label>
                        <input 
                            type="text" 
                            placeholder="Ej: Iago Menor" 
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input 
                            type="email" 
                            placeholder="correo@ejemplo.com" 
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    <button 
                        disabled={cargando}
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 disabled:bg-gray-400"
                    >
                        {cargando ? 'Creando cuenta...' : 'Registrarse ahora'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-500">¿Ya tienes cuenta? </span>
                    <Link href="/login" className="text-indigo-600 font-bold hover:underline">Inicia sesión</Link>
                </div>
            </div>
        </main>
    );
}