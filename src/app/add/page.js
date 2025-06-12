'use client';

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem, SelectContent } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import { useJobStore } from "@/store/jobStore";

export default function AddApplicationPage() {
    const [date, setDate] = useState(new Date());
    const [priority, setPriority] = useState("Medium");
    const [showAlert, setShowAlert] = useState(false);
    const addJob = useJobStore(state => state.addJob);

    function handleSubmit(e) {
        e.preventDefault();
        // Gather form data
        const form = e.target;
        const newJob = {
            company: form[0].value,
            position: form[1].value,
            location: form[2].value,
            salary: form[3].value,
            status: form[4].querySelector('[data-state="checked"]')?.textContent || "Applied",
            priority: priority, // use controlled state
            appliedDate: format(date, "dd-MM-yyyy"),
            contactPerson: form[7].value,
            contactEmail: form[8].value,
            notes: form[9].value,
        };
        addJob(newJob); // Add to global store
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
        form.reset();
        setPriority("Medium"); // reset priority to default
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            {/* Alert */}
            {showAlert && (
                <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-green-500 text-white px-6 py-3 rounded shadow">
                        Application added successfully!
                    </div>
                </div>
            )}
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                📅 Add New Application
            </h1>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                {/* Company & Position */}
                <div>
                    <label className="font-medium">Company *</label>
                    <Input placeholder="e.g. Google, Microsoft" />
                </div>
                <div>
                    <label className="font-medium">Position *</label>
                    <Input placeholder="e.g. Frontend Developer" />
                </div>

                {/* Location & Salary */}
                <div>
                    <label className="font-medium">Location</label>
                    <Input placeholder="e.g. San Francisco, CA" />
                </div>
                <div>
                    <label className="font-medium">Salary Range</label>
                    <Input placeholder="e.g. $80k - $120k" />
                </div>

                {/* Status, Priority, Date */}
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
                    <Select value={priority} onValueChange={setPriority}>
                        <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="md:col-span-2">
                    <label className="font-medium">Applied Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Contact Info */}
                <div>
                    <label className="font-medium">Contact Person</label>
                    <Input placeholder="e.g. John Smith" />
                </div>
                <div>
                    <label className="font-medium">Contact Email</label>
                    <Input placeholder="john@company.com" />
                </div>

                {/* Notes */}
                <div className="md:col-span-2">
                    <label className="font-medium">Notes</label>
                    <Textarea placeholder="Additional notes about this application..." />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Submit Application
                    </Button>
                </div>
            </form>
        </div>
    );
}
