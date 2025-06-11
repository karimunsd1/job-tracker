import { create } from "zustand";

export const useJobStore = create((set) => ({
    jobs: [],
    addJob: (job) => set((state) => ({ jobs: [...state.jobs, job] })),
    updateJob: (updatedJob) =>
        set((state) => ({
            jobs: state.jobs.map((job) =>
                job.id === updatedJob.id ? updatedJob : job
            ),
        })),
    deleteJob: (id) =>
        set((state) => ({
            jobs: state.jobs.filter((job) => job.id !== id),
        })),
}));
