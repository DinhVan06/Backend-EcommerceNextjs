const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: false },
  description: String,
  isDelete: { type: Boolean, default: false },
});
const Category = model("Category", categorySchema);

module.exports = Category;
