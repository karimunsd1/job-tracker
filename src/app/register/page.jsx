'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../validationSchema/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebase';

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const submitForm = async (values) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, values.email, values.password);
      console.log('firebase', response);
      alert('User registered successfully');
      router.push('/login');
    } catch (e) {
      console.log('catch', e.message);
      alert(e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-md p-10 rounded-3xl shadow-xl max-w-md w-full border border-indigo-300 dark:border-indigo-600">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700 dark:text-indigo-300 tracking-tight drop-shadow-md">
          Create Account ✨
        </h1>

        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-6">
       
          <div className="relative">
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className={`w-full px-5 py-3 rounded-xl border bg-white/90 dark:bg-gray-800 ${
                errors.email ? 'border-red-500' : 'border-indigo-300 dark:border-indigo-500'
              } focus:outline-none focus:ring-4 focus:ring-indigo-400 dark:focus:ring-indigo-700 transition`}
            />
            {errors.email && (
              <p className="absolute text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

        
          <div className="relative">
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className={`w-full px-5 py-3 rounded-xl border bg-white/90 dark:bg-gray-800 ${
                errors.password ? 'border-red-500' : 'border-indigo-300 dark:border-indigo-500'
              } focus:outline-none focus:ring-4 focus:ring-indigo-400 dark:focus:ring-indigo-700 transition`}
            />
            {errors.password && (
              <p className="absolute text-sm text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          
          <div className="relative">
            <input
              {...register('cnfPassword')}
              type="password"
              placeholder="Confirm Password"
              className={`w-full px-5 py-3 rounded-xl border bg-white/90 dark:bg-gray-800 ${
                errors.cnfPassword ? 'border-red-500' : 'border-indigo-300 dark:border-indigo-500'
              } focus:outline-none focus:ring-4 focus:ring-indigo-400 dark:focus:ring-indigo-700 transition`}
            />
            {errors.cnfPassword && (
              <p className="absolute text-sm text-red-600 mt-1">{errors.cnfPassword.message}</p>
            )}
          </div>

         
          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 shadow-lg transition duration-300"
          >
            Register
          </button>
        </form>

     
        <p className="text-center text-gray-700 dark:text-gray-300 mt-8 text-sm">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-indigo-700 dark:text-indigo-300 font-semibold hover:underline hover:text-purple-800 dark:hover:text-purple-400 transition"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
