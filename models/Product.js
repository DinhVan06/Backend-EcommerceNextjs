const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
// Mongoose Datatypes:
// https://mongoosejs.com/docs/schematypes.html

// Validator
// https://mongoosejs.com/docs/validation.html#built-in-validators

const productSchema = new Schema({
  name: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: [0, "Must be at least 0, got {VALUE}"],
  },
  discount: { type: Number, min: 0, max: 100, required: false, default: 0 },
  stock: { type: Number, min: 0, required: true },
  unit: { type: String, required: [true, "Đơn vị không thể bỏ trống"] },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  supplierId: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
  description: { type: String, required: false },
  isDelete: { type: Boolean, default: false },
  imageUrl: { type: String, required: false },
  images: { type: Array, required: false },
  createdAt: { type: Date, default: Date.now() },
  // weight: {
  //   oneOf: [
  //     {
  //       type: Object,
  //       properties: {
  //         values: {
  //           type: Array,
  //           items: {
  //             type: Number,
  //             minimum: 0,
  //           },
  //         },
  //         unit: { type: String, enum: ["kg"], required: true },
  //       },
  //       required: ["value", "unit"],
  //     },
  //   ],
  // },
});

// virtual
productSchema.virtual("total").get(function () {
  return (this.price * (100 - this.discount)) / 100;
});

// Virtual with Populate
productSchema.virtual("category", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});
productSchema.virtual("supplier", {
  ref: "Supplier",
  localField: "supplierId",
  foreignField: "_id",
  justOne: true,
});
// Virtuals in Object()
productSchema.set("toObject", { virtuals: true });

// Virtuals in JSON()
productSchema.set("toJSON", { virtuals: true });

productSchema.plugin(mongooseLeanVirtuals);

const Product = model("Product", productSchema);

module.exports = Product;
