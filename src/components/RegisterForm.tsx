'use client'

import { useState } from "react";
import axios from 'axios';

export default function RegisterForm() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'https://fitness-backend-production-1018.up.railway.app/users/register',
                form
            );

            setMessage('✅ Registered successfully!');
            console.log('Reponse: ' + response.data);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.log('Response error: ' + err.response);
                setMessage('❌ Registration failed.');
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 border rounded"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Register</button>
                {message && <p className="text-center mt-2">{message}</p>}
            </form>
        </>
    )
}