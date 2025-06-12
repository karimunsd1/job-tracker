"use client";

import { useState } from "react";
import { useJobStore } from "@/store/jobStore";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectContent } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

    // Replace the form's onSubmit with this handler:
    function handleSubmit(e) {
        e.preventDefault();
        // TODO: Add logic to actually add the job to your store here!
        setShowModal(false);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
    }

    return (
        <main className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 p-2 rounded-md">📁</span>
                    Applications
                </h1>
                <p className="text-gray-500 mt-1">Filter and manage your job applications</p>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
                <div className="flex flex-wrap gap-4 items-end">
                    <div className="flex-1 min-w-[200px]">
                        <label className="text-sm font-medium text-gray-600">Search</label>
                        <Input placeholder="Search by company..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <label className="text-sm font-medium text-gray-600">Status</label>
                        <Select
                            value={status}
                            onValueChange={setStatus}
                            placeholder="All"
                        >
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
                        <label className="text-sm font-medium text-gray-600">Priority</label>
                        <Select
                            value={priority}
                            onValueChange={setPriority}
                            placeholder="All"
                        >
                            <SelectContent>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        className="ml-auto"
                        onClick={() => setShowModal(true)}
                    >
                        + Add Application
                    </Button>
                </div>

                <p className="text-sm text-gray-500 pt-2">
                    {filteredJobs.length} application(s) found
                </p>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div
                        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-0 relative flex flex-col"
                        style={{ maxHeight: "90vh" }}
                    >
                        <button
                            className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600 z-10"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </button>
                        <div className="overflow-y-auto p-8 rounded-xl" style={{ maxHeight: "90vh" }}>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="text-2xl">📅</span>
                                Add New Application
                            </h2>
                            <form
                                className="bg-white rounded-lg p-6 md:p-8 shadow flex flex-col gap-6"
                                onSubmit={handleSubmit}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-medium">Company *</label>
                                        <Input placeholder="e.g. Google, Microsoft" />
                                    </div>
                                    <div>
                                        <label className="font-medium">Position *</label>
                                        <Input placeholder="e.g. Frontend Developer" />
                                    </div>
                                    <div>
                                        <label className="font-medium">Location</label>
                                        <Input placeholder="e.g. San Francisco, CA" />
                                    </div>
                                    <div>
                                        <label className="font-medium">Salary Range</label>
                                        <Input placeholder="e.g. $80k - $120k" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="font-medium">Job URL</label>
                                        <Input placeholder="https://company.com/jobs/123" />
                                    </div>
                                    <div>
                                        <label className="font-medium">Status</label>
                                        <Select defaultValue="Applied">
                                            <SelectContent>
                                                <SelectItem value="Applied">Applied</SelectItem>
                                                <SelectItem value="Interviewing">Interviewing</SelectItem>
                                                <SelectItem value="Offer">Offer</SelectItem>
                                                <SelectItem value="Rejected">Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="font-medium">Priority</label>
                                        <Select defaultValue="Medium">
                                            <SelectContent>
                                                <SelectItem value="Low">Low</SelectItem>
                                                <SelectItem value="Medium">Medium</SelectItem>
                                                <SelectItem value="High">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="font-medium">Applied Date</label>
                                        <Input type="text" value="11-06-2025" readOnly className="pr-10" />
                                        <span className="absolute right-4 top-10 text-gray-400 pointer-events-none">
                                            <svg width="20" height="20" fill="none" stroke="currentColor"><circle cx="10" cy="10" r="9" strokeWidth="2" /><path d="M7 10h6M10 7v6" strokeWidth="2" /></svg>
                                        </span>
                                    </div>
                                    <div className="md:col-span-2"></div>
                                    <div>
                                        <label className="font-medium">Contact Person</label>
                                        <Input placeholder="e.g. John Smith" />
                                    </div>
                                    <div>
                                        <label className="font-medium">Contact Email</label>
                                        <Input placeholder="john@company.com" />
                                    </div>
                                </div>
                                <div>
                                    <label className="font-medium">Notes</label>
                                    <Input placeholder="Additional notes about this application..." />
                                </div>
                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2">
                                    Submit Application
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full mt-2"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Alert */}
            {showAlert && (
                <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-green-500 text-white px-6 py-3 rounded shadow">
                        Application added successfully!
                    </div>
                </div>
            )}
        </main>
    );
}