import { z } from "zod";

export const jobSchema = z.object({
    company: z.string().min(1),
    role: z.string().min(1),
    status: z.string(),
    priority: z.string(),
});
