import express from "express";
import multer from "multer";
import Sweet from "../models/sweet.js";
import { protect, adminOnly } from "../middleware/auth.js";
import path from "path";
import fs from "fs";

const router = express.Router();

// multer storage for uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, "uploads/"); },
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// router.post("/", protect, adminOnly, upload.single("img"), async (req, res) => {
router.post("/", upload.single("img"), async (req, res) => {
  try {
    // If body is an array -> bulk create
    if (Array.isArray(req.body.sweets)) {
      // body.sweets may be a JSON string if sent via form; try parse
      const sweets = typeof req.body.sweets === "string" ? JSON.parse(req.body.sweets) : req.body.sweets;
      const added = await Sweet.insertMany(sweets);
      return res.status(201).json({ message: "Sweets added", added });
    }

    // normal single sweet. If uploaded image present, set path
    const { name, category, price, quantity, img } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : (img || "");
    const sweet = new Sweet({ name, category, price, quantity, img: imagePath });
    await sweet.save();
    res.status(201).json({ message: "Sweet added", sweet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get all sweets
router.get("/", async (req, res) => {
  try {
    const sweets = await Sweet.find().sort({ createdAt: -1 });
    res.json(sweets);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.get("/:id", async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });
    res.json(sweet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// search
router.get("/search", async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  const filter = {};
  if (name) filter.name = new RegExp(name, "i");
  if (category) filter.category = category;
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);
  const sweets = await Sweet.find(filter);
  res.json(sweets);
});

// update sweet
router.put("/:id", upload.single("img"), async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });

    // Update image if new file uploaded
    if (req.file) {
      // Delete old image
      if (sweet.img && sweet.img.startsWith("/uploads/")) {
        const filePath = path.join(process.cwd(), sweet.img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
      sweet.img = `/uploads/${req.file.filename}`;
    }

    // Update other fields
    const { name, category, price, quantity } = req.body;
    if (name) sweet.name = name;
    if (category) sweet.category = category;
    if (price) sweet.price = price;
    if (quantity) sweet.quantity = quantity;

    await sweet.save();
    res.json({ message: "Sweet updated", sweet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// delete
router.delete("/:id", async (req, res) => {
  try {
    // Delete document from DB
    const deletedSweet = await Sweet.findByIdAndDelete(req.params.id);
    if (!deletedSweet) return res.status(404).json({ message: "Not found" });

    // Delete uploaded file if exists
    if (deletedSweet.img && deletedSweet.img.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), deletedSweet.img);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// purchase (decrement)
router.post("/:id/purchase", protect, async (req, res) => {
  try {
    const s = await Sweet.findById(req.params.id);
    if (!s) return res.status(404).json({ message: "Not found" });
    if (s.quantity <= 0) return res.status(400).json({ message: "Out of stock" });
    s.quantity -= 1;
    await s.save();
    res.json(s);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// restock (admin)
router.post("/:id/restock", async (req, res) => {
  try {
    const { amount } = req.body;
    const s = await Sweet.findById(req.params.id);
    if (!s) return res.status(404).json({ message: "Not found" });
    s.quantity += Number(amount || 0);
    await s.save();
    res.json(s);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
