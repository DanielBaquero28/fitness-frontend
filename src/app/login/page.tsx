import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
    return (
        <>
            <main className='flex items-center justify-center min-h-screen p-4'>
                <div className="w-full max-w-md">
                    <h1 className="text-2x1 font-bold mb-4 text-center">Log In</h1>
                    <LoginForm />
                </div>
            </main>
        </>
    )
}