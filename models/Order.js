const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

// order detail
const orderDetailSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 0 },
});

orderDetailSchema.virtual("product", {
  ref: "Product",
  localField: "productId",
  foreignField: "_id",
  justOne: true,
});

orderDetailSchema.set("toObject", { virtuals: true });

// Virtuals in JSON()
orderDetailSchema.set("toJSON", { virtuals: true });

//--------------------------------------------------//

const orderSchema = new Schema({
  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },

  shippedDate: {
    type: Date,
    validate: {
      validator: function (value) {
        if (!value) return true;

        if (value < this.createdDate) {
          return false;
        }
        return true;
      },
      message: `Shipped date: {VALUE} is invalid!`,
    },
  },
  status: {
    type: String,
    required: true,
    default: "WAITING CONFIRMATION ORDER",
    validate: {
      validator: (value) => {
        if (
          [
            "WAITING CONFIRMATION ORDER",
            "CONFIRMED ORDER",
            "SHIPPING CONFIRMATION",
            "DELIVERY IN PROGRESS",
            "DELIVERY SUCCESS",
            "RECEIVED ORDER",
            "CANCELED ORDER",
          ].includes(value)
        ) {
          return true;
        }
        return false;
      },
      message: `status: {status} is invalid`,
    },
  },
  description: { type: String },
  shippingAddress: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
    default: "CASH",
    validate: {
      validator: (value) => {
        if (["CASH", "MOMO"].includes(value.toUpperCase())) {
          return true;
        }
        return false;
      },
      message: `Payment type: {VALUE} is invalid!`,
    },
  },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: false },
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "Employees",
    required: false,
  },
  // tên
  fullName: {
    type: String,
    required: false,
  },

  // số điện thoại
  phoneNumber: {
    type: String,
    required: false,
  },
  orderDetails: [orderDetailSchema],
  isDelete: { type: Boolean, default: false },
});

// Virtual with Populate
orderSchema.virtual("customer", {
  ref: "Customer",
  localField: "customerId",
  foreignField: "_id",
  justOne: true,
});

orderSchema.virtual("employee", {
  ref: "Employee",
  localField: "employeeId",
  foreignField: "_id",
  justOne: true,
});

orderSchema.set("toJSON", { virtuals: true });
orderSchema.set("toObject", { virtuals: true });

orderSchema.plugin(mongooseLeanVirtuals);
const Order = model("Order", orderSchema);
module.exports = Order;
