import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },
  customerName: {
    type: String,
    required: [true, "Customer name is required"],
    trim: true,
  },
  customerPhone: {
    type: String,
    required: [true, "Customer phone is required"],
  },
  customerEmail: {
    type: String,
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["new", "contacted", "closed"],
    default: "new",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
