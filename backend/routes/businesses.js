import express from "express";
import Business from "../models/Business.js";
import User from "../models/User.js";
import { protect, businessOwner } from "../middleware/auth.js";

const router = express.Router();

// @route   GET /api/businesses
// @desc    Get all active businesses
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = { isActive: true };

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    // Category filter
    if (category && category !== "All") {
      query.category = category;
    }

    const businesses = await Business.find(query).sort({ createdAt: -1 });
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/businesses/:id
// @desc    Get single business and increment views
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    // Increment view count
    business.views = (business.views || 0) + 1;
    await business.save();

    res.json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/businesses
// @desc    Create a new business
// @access  Private (Authenticated users)
router.post("/", protect, async (req, res) => {
  try {
    const { name, ownerName, category, location, phone, description, image } =
      req.body;

    const business = await Business.create({
      name,
      ownerName,
      category,
      location,
      phone,
      description,
      image,
      userId: req.user._id,
    });

    // Upgrade user to business_owner role if they're not already
    if (req.user.role === "user") {
      req.user.role = "business_owner";
      await req.user.save();
    }

    res.status(201).json(business);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/businesses/user/my-businesses
// @desc    Get businesses owned by logged-in user
// @access  Private
router.get("/user/my-businesses", protect, async (req, res) => {
  try {
    const businesses = await Business.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/businesses/:id
// @desc    Update a business
// @access  Private (Owner or Admin)
router.put("/:id", protect, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    // Check if user owns the business or is admin
    if (
      business.userId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this business" });
    }

    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    res.json(updatedBusiness);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/businesses/:id
// @desc    Delete a business
// @access  Private (Owner or Admin)
router.delete("/:id", protect, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    // Check if user owns the business or is admin
    if (
      business.userId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this business" });
    }

    await Business.findByIdAndDelete(req.params.id);
    res.json({ message: "Business deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
