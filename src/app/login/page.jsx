'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { loginSchema } from '../validationSchema/auth';
import { auth } from '@/services/firebase';

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const submitForm = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        console.log('Login success:', userCredential.user);
        alert('Login Successful');
        router.push('/');
      })
      .catch((error) => {
        console.error('Login failed:', error.message);
        alert('Invalid email or password');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-md p-10 rounded-3xl shadow-xl max-w-md w-full border border-indigo-300 dark:border-indigo-700">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700 dark:text-indigo-300 tracking-tight drop-shadow-md">
          Welcome Back 👋
        </h1>

        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-5">
          {/* Email Field */}
          <div className="relative">
            <input
              {...register('email')}
              type="email"
              placeholder="Enter your email"
              className={`w-full px-5 py-3 rounded-xl border bg-white/90 dark:bg-gray-800 ${
                errors.email ? 'border-red-500' : 'border-indigo-300 dark:border-indigo-600'
              } focus:outline-none focus:ring-4 focus:ring-indigo-400 dark:focus:ring-indigo-700 transition`}
            />
            {errors.email && (
              <p className="absolute text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              {...register('password')}
              type="password"
              placeholder="Enter your password"
              className={`w-full px-5 py-3 rounded-xl border bg-white/90 dark:bg-gray-800 ${
                errors.password ? 'border-red-500' : 'border-indigo-300 dark:border-indigo-600'
              } focus:outline-none focus:ring-4 focus:ring-indigo-400 dark:focus:ring-indigo-700 transition`}
            />
            {errors.password && (
              <p className="absolute text-sm text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 shadow-lg transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-700 dark:text-gray-300 mt-8 text-sm">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-indigo-700 dark:text-indigo-300 font-semibold hover:underline hover:text-purple-800 dark:hover:text-purple-400 transition"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
