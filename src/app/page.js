"use client";
import { useState } from "react";
import { useJobStore } from "../store/jobStore";
import { Button } from "../components/ui/button.jsx";
import Link from "next/link";
import StatusBar from "../components/StatusBar";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const { jobs } = useJobStore();

  // Modal state
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const total = jobs.length;
  const recent = jobs.slice(-1).length;
  const offers = jobs.filter(j => j.status === "Offer").length;
  const successRate = total > 0 ? Math.round((offers / total) * 100) : 0;

  const statusCount = {
    Applied: jobs.filter(j => j.status === "Applied").length,
    Interview: jobs.filter(j => j.status === "Interview").length,
    Offer: jobs.filter(j => j.status === "Offer").length,
    Rejected: jobs.filter(j => j.status === "Rejected").length
  };

  const priorityCount = {
    High: jobs.filter(j => j.priority === "High").length,
    Medium: jobs.filter(j => j.priority === "Medium").length,
    Low: jobs.filter(j => j.priority === "Low").length
  };

  return (
    <>
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-blue-700">JobTracker</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setShowLogin(true)}>Login</Button>
          <Button variant="outline" onClick={() => setShowRegister(true)}>Register</Button>
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-8 relative">
            <button
              className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-600"
              onClick={() => setShowLogin(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input type="email" className="w-full border rounded px-3 py-2 mt-1" placeholder="you@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input type="password" className="w-full border rounded px-3 py-2 mt-1" placeholder="Password" />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2">
                Login
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-8 relative">
            <button
              className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-600"
              onClick={() => setShowRegister(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Register</h2>
            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input type="email" className="w-full border rounded px-3 py-2 mt-1" placeholder="you@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input type="password" className="w-full border rounded px-3 py-2 mt-1" placeholder="Password" />
              </div>
              <div>
                <label className="block text-sm font-medium">Confirm Password</label>
                <input type="password" className="w-full border rounded px-3 py-2 mt-1" placeholder="Confirm Password" />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2">
                Register
              </Button>
            </form>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 p-2 rounded-md">📂</span>
            Job Application Tracker
          </h1>
          <p className="text-gray-500 mt-2">Manage and track all your job applications in one place</p>
        </div>

        <div className="flex items-center space-x-4 border-b pb-2">
          <Button variant="outline" className="font-semibold">📊 Dashboard</Button>
          <Link href="/applications"><Button variant="ghost">📁 Applications</Button></Link>
          <Link href="/add"><Button variant="default">＋ Add New</Button></Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Applications" value={total} subtitle="All job applications" />
          <StatCard title="Recent Applications" value={recent} subtitle="Applied this week" />
          <StatCard title="Offers" value={offers} subtitle="Job offers received" />
          <StatCard title="Success Rate" value={`${successRate}%`} subtitle="Offer to application ratio" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatusBar title="📈 Application Status Overview" data={statusCount} />
          <StatusBar title="⏱️ Priority Distribution" data={priorityCount} />
        </div>

        <footer className="text-center text-sm text-gray-500 pt-8">
          © 2025 Job Application Tracker.
        </footer>
      </main>
    </>
  );
}
