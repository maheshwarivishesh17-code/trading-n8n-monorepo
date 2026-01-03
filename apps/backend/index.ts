import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {
  CreateWorkflowSchema,
  signinSchema,
  signupSchema,
  UpdateWorkflowSchema,
} from "../../packages/common/types";
import {
  ExecutionModel,
  NodesModel,
  UserModel,
  WorkflowModel,
} from "db/client"
import { authMiddleware } from "./middleware";

// 2. Encode the secret
const JWT_SECRET_ENCODED = new TextEncoder().encode(process.env.JWT_SECRET!);

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.post("/signup", async (req, res) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) return res.status(403).json({ message: "incorrect inputs" });

  try {
    const user = await UserModel.create({
      username: result.data.username,
      password: result.data.password,
    });

    // IMPORTANT: jose needs the ID as a string!
  

    res.json({ message: "User created successfully" });
  } catch (e: any) {
    console.error("DEBUG SIGNUP ERROR:", e); // THIS WILL TELL US THE TRUTH

    if (e.code === 11000) {
      return res.status(411).json({ message: "username already exists" });
    }
    return res.status(500).json({ message: "Internal Error", error: e.message });
  }
});

app.post("/signin", async (req, res) => {
  const result = signinSchema.safeParse(req.body);
  if (!result.success) return res.status(403).json({ message: "incorrect inputs" });

  try {
    const user = await UserModel.findOne({
      username: result.data.username,
      password: result.data.password,
    });

    if (user) {

      return res.json({ id: user._id });
    } else {
      return res.status(403).json({ message: "Incorrect Credentials" });
    }
  } catch (e: any) {
    console.error("DEBUG SIGNIN ERROR:", e); // THIS WILL TELL US THE TRUTH
    return res.status(500).json({ message: "Internal error", error: e.message });
  }
});

// ... rest of your workflow routes remain the same ...

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});