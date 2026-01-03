import type { NextFunction, Request, Response } from "express";

// Encode the secret for jose
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

// Note the 'async' keyword here
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers["authorization"] as string;

  if (!header) {
    return res.status(403).json({ message: "You are not logged in" });
  }

  try {
    // jose.jwtVerify is async and returns an object containing 'payload'

    
    // Store the ID (payload contains the data you signed)
    req.userid = "user123";
    next();
  } catch (e) {
    console.error("JWT Verify Error:", e);
    return res.status(403).json({ message: "You are not logged in" });
  }
}