import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "No token" });
    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized", error: err.message });
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "No user" });
  if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });
  next();
};
