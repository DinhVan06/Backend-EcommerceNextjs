const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  categoryType: {
    type: String,
    required: [true, "Loại danh mục không để trống"],
  },
  isDelete: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  calories: {
    type: Number,
    min: [0, "Số lượng Calo phải lớn hơn hoặc bằng 0"],
    required: [true, "Số lượng Calo không thể trống"],
  },
  imageUrl: { type: String, required: false },
  description: String,
});
const Category = model("Category", categorySchema);

module.exports = Category;
