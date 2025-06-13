"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebase"; 
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  const handleRegister = () => {
    router.push("/register");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsLogin(false);
    router.push("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLogin(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/70 backdrop-blur shadow-md border-b border-gray-300 dark:border-gray-700 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href='/' className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
          🚀 JobTracker
        </Link>
        <div className="space-x-3">
          {!isLogin ? (
            <>
              <Button variant="ghost" onClick={handleLogin}>
                Login
              </Button>
              <Button variant="outline" onClick={handleRegister}>
                Register
              </Button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-white text-amber-700 font-semibold px-4 py-1 rounded-md hover:bg-yellow-100 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
