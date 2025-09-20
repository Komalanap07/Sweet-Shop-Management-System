import mongoose from "mongoose";

const sweetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  img: { type: String } 
}, { timestamps: true });
const Sweet = mongoose.model("Sweet", sweetSchema);

export default Sweet;