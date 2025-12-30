
import {z } from "zod";

export const signupSchema = z.object({
    username: z.string().min(3).max(100),
    password: z.string()
});