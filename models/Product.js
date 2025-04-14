// models/Product.js

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 60,
    },
    img: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
      maxLength: 200,
    },
    prices: {
      type: [Number],
      required: true,
    },
    extraOption: {
      type: [
        {
          text: { type: String },
          price: { type: Number },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
