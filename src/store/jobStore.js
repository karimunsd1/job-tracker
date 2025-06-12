import { create } from "zustand";

const useJobStore = create((set) => ({
    jobs: [],
    addJob: (job) => set((state) => ({ jobs: [...state.jobs, job] })),
    updateJob: (id, updatedJob) => set((state) => ({
        jobs: state.jobs.map((job) => (job.id === id ? { ...job, ...updatedJob } : job))
    })),
    deleteJob: (id) => set((state) => ({
        jobs: state.jobs.filter((job) => job.id !== id)
    })),
    setJobs: (jobs) => set({ jobs })
}));

export { useJobStore };
