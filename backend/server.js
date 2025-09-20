import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from "./routes/authroute.js";
import sweetRoutes from "./routes/sweetroute.js";
import cors from "cors";
import path from "path";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

// export for tests
export default app;

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}
