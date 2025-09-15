import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast, Toaster } from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      navigate('/');
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-white dark:bg-slate-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-100 dark:bg-slate-700 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-emerald-500 dark:text-emerald-400 mb-6">
            Login to Recipe Remixer
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-600 dark:text-slate-300 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md p-3 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors duration-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-300 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md p-3 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors duration-300"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 disabled:bg-slate-500"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-slate-600 dark:text-slate-300 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-emerald-500 hover:text-emerald-600">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;