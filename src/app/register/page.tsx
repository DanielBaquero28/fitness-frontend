import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
    return (
        <>
            <main className="flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-md">
                    <h1 className="text-2x1 font-bold mb-4 text-center">Create an Account</h1>
                    <RegisterForm />
                </div>
            </main>
        </>
    )
}