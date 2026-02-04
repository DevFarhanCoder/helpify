import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Business name is required"],
    trim: true,
  },
  ownerName: {
    type: String,
    required: [true, "Owner name is required"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: [
      "Restaurant",
      "Hotels",
      "Beauty Spa",
      "Home Decor",
      "Wedding Planning",
      "Education",
      "Rent & Hire",
      "Hospitals",
      "Contractors",
      "Pet Shops",
      "PG/Hostels",
      "Estate Agent",
      "Dentists",
      "Gym",
      "Loans",
      "Event Organisers",
      "Driving Schools",
      "Packers & Movers",
      "Courier Service",
      "Electronics",
      "Salon",
      "Grocery",
      "Pharmacy",
      "Clothing",
    ],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: 20,
  },
  image: {
    type: String,
    required: [true, "Image URL is required"],
  },
  images: {
    type: [String],
    default: [],
  },
  views: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  subscriptionStatus: {
    type: String,
    enum: ["active", "inactive", "pending"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Business = mongoose.model("Business", businessSchema);

export default Business;
