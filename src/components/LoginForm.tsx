'use client'

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    // Variables
    const router = useRouter();
    const [form, setForm] = useState({
        'username': '',
        'password': ''
    });
    const [error, setError] = useState('');

    // Util functions
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        console.log('Sending:', form);

        const data = new FormData();
        data.append('username', form.username);
        data.append('password', form.password);


        try {
            const response = await axios.post(
                'https://fitness-backend-production-1018.up.railway.app/users/login',
                data,
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlenconded' }
                }
            );

            console.log('Response:', response.data);
            const { access_token } = response.data;
            localStorage.setItem('token', access_token);
            router.push('/dashboard');

        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.error(err.response?.data || err.message);
                setError("Invalid username or password");
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name='username'
                    type="text"
                    placeholder='Username'
                    className='w-full px-4 py-2 border rounded'
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <input
                    name='password'
                    type="password"
                    placeholder='Password'
                    className='w-full px-4 py-2 border rounded'
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition">
                    Login
                </button>
                {error && <p className='text-red-500 text-center'>{error}</p>}
            </form>
        </>
    );
}