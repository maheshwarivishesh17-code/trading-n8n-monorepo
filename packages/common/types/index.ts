
import {z } from "zod";
import { id } from "zod/locales";

export const signupSchema = z.object({
    username: z.string().min(3).max(100),
    password: z.string()
});


export const signinSchema = z.object({
    username: z.string().min(3).max(100),
    password: z.string()
});

export const CreateWorkflowSchema = z.object({
    nodes: z.array(z.object({
        type: z.string(),
        data: z.object({
        kind: z.enum(["action", "trigger"]),
        metadata: z.any()
        }),
        id: z.string(),
        position: z.object({
            x: z.number(),
            y: z.number()
        })
    })),
    edges: z.array(z.object({
        id: z.string(),
        source: z.string(),
        target: z.string(),
    }))
});
export const UpdateWorkflowSchema = z.object({
    nodes: z.array(z.object({
        id: z.string(),
        position: z.object({    
            x: z.number(),
            y: z.number()
        })  
    })),
    edges: z.array(z.object({
        id: z.string(), 
        source: z.string(),
        target: z.string(),
    }))
});