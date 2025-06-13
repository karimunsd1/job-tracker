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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLogin(!!user);
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
    <>
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-[#4d8aff]">
        {isLogin ? (
          <main className="max-w-6xl mx-auto px-4 py-12 space-y-10">
            <section>
              <h1 className="text-4xl font-bold flex items-center gap-3">
                <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-white p-3 rounded-full shadow-inner">
                  📊
                </span>
                Dashboard Overview
              </h1>
              <p className="text-gray-500 mt-2 dark:text-gray-400 max-w-2xl">
                Welcome to your job search control center. Track your applications, monitor progress, and stay organized.
              </p>
            </section>

            <section className="flex flex-wrap gap-4 border-b border-gray-300 pb-4 dark:border-gray-700">
              <Button variant="outline" className="font-semibold">🧭 Overview</Button>
              <Link href="/applications"><Button variant="ghost">📁 All Applications</Button></Link>
              <Link href="/add"><Button variant="default">＋ New Application</Button></Link>
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

            <footer className="text-center text-sm text-gray-500 pt-16 dark:text-gray-400">
              Made with 💼 by JobTracker · © {new Date().getFullYear()}
            </footer>
          </main>
        ) : (
          <Suspense fallback={<div className="text-center py-10 text-lg text-gray-500">Loading user...</div>}>

          </Suspense>
        )}
      </div>
    </>
  );
}
