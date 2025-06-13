"use client";

import { useState } from "react";
import { useJobStore } from "@/store/jobStore";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectContent, SelectTrigger } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ApplicationsPage() {
  const { jobs } = useJobStore();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.company.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status ? job.status === status : true;
    const matchesPriority = priority ? job.priority === priority : true;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  function handleSubmit(e) {
    e.preventDefault();
    setShowModal(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  }
  const handleBack = () => {
    router.push('/');
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
      <button
        onClick={handleBack}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-lg transition-colors duration-200 shadow"
      >
        ⬅ Back
      </button>
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
          <span className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-white p-2 rounded-md">📁</span>
          Applications
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Filter and manage your job applications</p>
      </div>


      <div className="max-w-6xl mx-auto bg-white/80 dark:bg-gray-900/70 backdrop-blur-md p-6 rounded-xl shadow border border-indigo-300 dark:border-indigo-600 space-y-4">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
            <Input placeholder="Search by company..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                {status}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Applied">Applied</SelectItem>
                <SelectItem value="Interview">Interview</SelectItem>
                <SelectItem value="Final Round">Final Round</SelectItem>
                <SelectItem value="Offer">Offer</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="w-full">
                {priority}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Link href='/add' className="ml-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 rounded-full py-2 px-2">
            + Add Application
          </Link>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 pt-2">
          {filteredJobs.length} application(s) found
        </p>
      </div>
    </main>
  );
}
