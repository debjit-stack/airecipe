import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast, Toaster } from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    const result = await register(name, email, password);
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
            Join Recipe Remixer
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-600 dark:text-slate-300 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md p-3 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors duration-300"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-300 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md p-3 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors duration-300"
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-300 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md p-3 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors duration-300"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 disabled:bg-slate-500"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-slate-600 dark:text-slate-300 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-500 hover:text-emerald-600">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;