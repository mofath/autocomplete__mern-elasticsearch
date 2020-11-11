const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    name: { type: String, maxlength: 250 },
    image: { type: String, maxlength: 250 },
    brand: { type: String, maxlength: 50 },
    price: { type: Number, default: 0 },
    category: {
      id: { type: String, maxlength: 250 },
      name: { type: String, maxlength: 250 },
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = { ProductModel };
