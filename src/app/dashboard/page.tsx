'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import CreateGoalForm from '@/components/CreateGoalForm';
import LogoutButton from '@/components/LogoutButton';

type Goal = {
  id: number;
  title: string;
  description: string;
  target: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
      router.push('/login');
    } else {
      setToken(storedToken);
      fetchGoals(storedToken);
    }
  }, [router]);

  const fetchGoals = async (jwt: string) => {
    console.log('Token being sent:', jwt);
    try {
      const response = await axios.get('https://fitness-backend-production-1018.up.railway.app/goals/', {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      console.log("GOALS:")
      console.log(response.data)
      setGoals(response.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(err.response || err.message);
        setError('Failed to load goals. Please make sure youre authenticated. ');
      }
    }
  };

  return (
    <main className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3x1 font-bold">
          Your Fitness Goals
        </h1>
        <LogoutButton />
      </div>

      <CreateGoalForm onGoalCreated={(newGoal) => setGoals((prev) => [newGoal, ...prev])}  />

      {error && <p className='text-red-500 mb-4'>{error}</p>}
      {goals.length === 0 && !error && <p>No goals found</p>}
      <ul className='space-y-4'>
        {goals.map((goal) => (
          <li key={goal.id} className='border p-4 rounded shadow'>
            <h2 className="text-xl font-semibold">{goal.title}</h2>
            <p className="text-gray-600">{goal.description}</p>
            <p className="text-sm text-gray-500">Target: {goal.target}</p>
          </li>
        ))}
      </ul>

      {token && (
        <p className="text-green-600">You are authenticated ✅</p>
      )}
    </main>
  );
}