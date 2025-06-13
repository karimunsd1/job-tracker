"use client";
import { useJobStore } from "@/store/jobStore";
import { Button } from "@/components/ui/button.jsx";
import StatusBar from "@/components/StatusBar";
import StatCard from "@/components/StatCard";
import Link from "next/link";

export default function Dashboard() {
    const { jobs } = useJobStore();

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
    );
}
