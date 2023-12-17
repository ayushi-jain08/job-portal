// models/Subcategory.js
import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
  name: String,
  image: {
    type: String,
    required: true,
  }, // URL to the subcategory image
});

export const Category = mongoose.model("categories", CategorySchema);
