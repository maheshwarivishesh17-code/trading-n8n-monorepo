
import type { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "123123adskkads");

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ message: "You are not logged in" });
  }

  try {
    const token = authHeader.startsWith("Bearer ") 
      ? authHeader.split(" ")[1] 
      : authHeader;

    const { payload } = await jwtVerify(token as string, JWT_SECRET);
    
    if (payload.id) {
      req.userid = payload.id as string;
      next();
    } else {
      return res.status(403).json({ message: "Invalid token payload" });
    }

  } catch (e) {
    console.error("JWT Verify Error:", e);
    return res.status(403).json({ message: "You are not logged in" });
  }
}