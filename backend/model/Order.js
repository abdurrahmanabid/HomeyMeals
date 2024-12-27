const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Order schema
const orderSchema = new Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "FoodItem",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    deliveryAddress: {
      lang: { type: Number, required: true }, // Latitude
      lat: { type: Number, required: true }, // Longitude
    },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "pending",
        "in_progress",
        "accepted_by_rider",
        "completed",
        "canceled",
        "cancelled_by_seller",
        "cancelled_by_rider",
        "assigned_to_rider",
      ],
      default: "pending",
      required: true,
    },
    deliveryFee: { type: Number, required: true, default: 0 },
    orderDate: { type: Date, default: Date.now },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["self-shipping", "cash_on_delivery"],
      required: true,
    },
    customerNotes: { type: String, default: "" },
    rating: { type: Number, min: 1, max: 5 },
    review: { type: String, default: "" },
    cancellationReason: { type: String, default: "" },
    cancellationDate: { type: Date },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
