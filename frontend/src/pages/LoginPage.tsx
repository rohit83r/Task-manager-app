import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { login } from '../features/auth/authSlice';
import {Link, useNavigate} from 'react-router-dom';

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error } = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const resultAction = await dispatch(login({ email, password }));
        if (login.fulfilled.match(resultAction)) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                    Login
                </h2>
                <form className="flex flex-col space-y-5" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-md text-white font-semibold transition
              ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && (
                        <p className="text-red-600 text-center text-sm mt-2">{error}</p>
                    )}
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default LoginPage;
