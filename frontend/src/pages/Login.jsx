import React, { useContext, useEffect, useState } from 'react';
import { shopContext } from '../context/shopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Login = () => {
  const { token, settoken, navigate, backendUrl } = useContext(shopContext);
  const [currentState, setcurrentState] = useState('Login');
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = currentState === 'Sign Up' ? 'register' : 'login';
      const payload = currentState === 'Sign Up' ? { name, email, password } : { email, password };

      const response = await axios.post(`${backendUrl}/api/user/${endpoint}`, payload);
      
      if(response.data.success) {
        settoken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success(`Welcome to VogueVault${currentState === 'Login' ? '!' : '! Start exploring!'}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(token) navigate('/');
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.form 
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6"
      >
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white prata-regular">
            {currentState}
            <span className="block w-12 h-1 bg-pink-500 mx-auto mt-2 rounded-full"></span>
          </h1>
          <p className="text-gray-500 dark:text-gray-300">
            {currentState === 'Login' 
              ? 'Welcome back to VogueVault' 
              : 'Join the VogueVault community'}
          </p>
        </div>

        <div className="space-y-4">
          {currentState === 'Sign Up' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <input
                onChange={(e) => setname(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                required
              />
            </motion.div>
          )}

          <input
            onChange={(e) => setemail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
            required
          />

          <input
            type="password"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors"
          >
            Forgot Password?
          </button>
          
          <button
            type="button"
            onClick={() => setcurrentState(current => current === 'Login' ? 'Sign Up' : 'Login')}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
          >
            {currentState === 'Login' ? 'Create Account' : 'Already have an account?'}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                {/* Loading spinner SVG */}
              </svg>
              Processing...
            </span>
          ) : (
            currentState === 'Login' ? 'Sign In' : 'Create Account'
          )}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 py-2 px-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              {/* Google icon */}
            </svg>
            Google
          </button>
          
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 py-2 px-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              {/* Apple icon */}
            </svg>
            Apple
          </button>
        </div>
      </motion.form>
    </div>
  );
}

export default Login;