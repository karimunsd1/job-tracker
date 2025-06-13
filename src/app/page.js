'use client';

import { useState, useEffect, Suspense } from "react";
import { Button } from "../components/ui/button.jsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../services/firebase";
import { useJobStore } from "../store/jobStore";
import StatusBar from "../components/StatusBar";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const router = useRouter();
  const { jobs } = useJobStore();
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLogin(!!user);
      setUserName(user?.displayName || user?.email?.split("@")[0] || "");
    });
    return () => unsubscribe();
  }, []);

  const total = jobs.length;
  const recent = jobs.slice(-1).length;
  const offers = jobs.filter((j) => j.status === "Offer").length;
  const successRate = total > 0 ? Math.round((offers / total) * 100) : 0;

  const statusCount = {
    Applied: jobs.filter((j) => j.status === "Applied").length,
    Interview: jobs.filter((j) => j.status === "Interview").length,
    Offer: jobs.filter((j) => j.status === "Offer").length,
    Rejected: jobs.filter((j) => j.status === "Rejected").length,
  };

  const priorityCount = {
    High: jobs.filter((j) => j.priority === "High").length,
    Medium: jobs.filter((j) => j.priority === "Medium").length,
    Low: jobs.filter((j) => j.priority === "Low").length,
  };

  const handlePush = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 px-4">
      {isLogin ? (
        <main className="max-w-6xl w-full mx-auto py-12 px-4 space-y-10 text-gray-800 dark:text-gray-100">
          <section>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <span className="bg-indigo-200 text-indigo-800 dark:bg-indigo-700 dark:text-white p-3 rounded-full shadow">
                📊
              </span>
              Dashboard Overview
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl">
              Welcome back, {userName || "User"}! Here’s how your job hunt is progressing.
            </p>
          </section>

          <section className="flex flex-wrap gap-4 border-b border-indigo-300 pb-4 dark:border-gray-700">
            <Button variant="outline" className="font-semibold">🧭 Overview</Button>
            <Link href="/applications">
              <Button variant="ghost">📁 All Applications</Button>
            </Link>
            <Link href="/add">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">＋ New Application</Button>
            </Link>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard title="Total Tracked" value={total} subtitle="All applications you've logged" icon="📁" />
            <StatCard title="Recent Activity" value={recent} subtitle="Most recently applied" icon="🕓" />
            <StatCard title="Offers Received" value={offers} subtitle="Congrats on these wins!" icon="🎉" />
            <StatCard title="Success Rate" value={`${successRate}%`} subtitle="Offers to total ratio" icon="📈" />
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatusBar title="📌 Application Status Breakdown" data={statusCount} />
            <StatusBar title="🚦 Priority Levels" data={priorityCount} />
          </section>

          <footer className="text-center text-sm text-gray-500 dark:text-gray-400 pt-16">
            Made with 💼 by JobTracker · © {new Date().getFullYear()}
          </footer>
        </main>
      ) : (
        <Suspense fallback={<div className="text-center py-10 text-lg text-gray-600 dark:text-gray-300">Loading user...</div>}>
          <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white border border-purple-200 dark:border-gray-700 rounded-xl shadow-xl px-8 py-10 max-w-md w-full text-center space-y-4">
            <div className="text-5xl">🔒</div>
            <h2 className="text-2xl font-bold">Login Required</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Hello {userName || "Guest"}, please log in to access your dashboard.
            </p>
            <Button onClick={handlePush} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              🔐 Login to Continue
            </Button>
          </div>
        </Suspense>
      )}
    </div>
  );
}
