'use client';

import { useState } from "react";
import axios from "axios";

type Goal = {
    id: number;
    title: string;
    description: string;
    target: string;
};

interface Props {
    onGoalCreated: (goal: Goal) => void;
}

export default function CreateGoalForm({ onGoalCreated }: Props) {
    const [form, setForm] = useState({ title: '', description: '', target: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const token = localStorage.getItem("token");

        if (!token) {
            return setError("You must be authenticated. Please login.");
        }

        try {
            const response = await axios.post('https://fitness-backend-production-1018.up.railway.app/goals/',
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            onGoalCreated(response.data);
            setForm({ title: '', description: '', target: '' });


        } catch (error: any) {
            console.error(error.response?.data || error.message);
            setError('Failed to create goal');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-8 border p-4 rounded">
            <h2 className="text-xl font-bold">Create new Goal</h2>
            <input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />
            <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
                required
            />
            <input
                name="target"
                placeholder="Target (e.g., Run 5km)"
                value={form.target}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Goal</button>

            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
}