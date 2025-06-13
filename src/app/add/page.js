'use client';

import { useState } from 'react';
import { useJobStore } from '@/store/jobStore';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectItem, SelectContent } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function AddApplicationPage() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [priority, setPriority] = useState('Medium');
  const [showAlert, setShowAlert] = useState(false);
  const addJob = useJobStore((state) => state.addJob);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const newJob = {
      company: form[0].value,
      position: form[1].value,
      location: form[2].value,
      salary: form[3].value,
      status:
        form[4].querySelector('[data-state="checked"]')?.textContent ||
        'Applied',
      priority,
      appliedDate: format(date, 'dd-MM-yyyy'),
      contactPerson: form[7].value,
      contactEmail: form[8].value,
      notes: form[9].value,
    };

    addJob(newJob);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
    form.reset();
    setPriority('Medium');
  }

  const handleApply = () => {
    router.push('/');
  };
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 dark:from-gray-950 dark:to-gray-900 py-12 px-4 transition-colors duration-300">
      {showAlert && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
            ✅ Application added successfully!
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-10 space-y-8 border border-gray-200 dark:border-gray-800 transition-all">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-lg transition-colors duration-200 shadow"
        >
          ⬅ Back
        </button>

        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
          📥 Add New Job Application
        </h1>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >

          <div>
            <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Company *
            </label>
            <Input placeholder="e.g. Google, Microsoft" />
          </div>


          <div>
            <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Position *
            </label>
            <Input placeholder="e.g. Frontend Developer" />
          </div>


          <div>
            <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Location
            </label>
            <Input placeholder="e.g. Bengaluru, Remote" />
          </div>


          <div>
            <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Salary Range
            </label>
            <Input placeholder="e.g. ₹10L - ₹25L" />
          </div>


          <div>
            <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Status
            </label>
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
            <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Priority
            </label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>


          <div className="md:col-span-2">
            <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Applied Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'dd-MM-yyyy') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Contact Person
            </label>
            <Input placeholder="e.g. Priya Sharma" />
          </div>
          <div>
            <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Contact Email
            </label>
            <Input placeholder="priya@company.com" />
          </div>

          <div className="md:col-span-2">
            <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Notes
            </label>
            <Textarea placeholder="Any specific notes or follow-up reminders..." />
          </div>

          <div className="md:col-span-2">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-lg font-semibold py-2 transition-all"
              onClick={handleApply}
            >
              📤 Submit Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
