import express from "express";
import Lead from "../models/Lead.js";
import Business from "../models/Business.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// @route   POST /api/leads
// @desc    Create a new lead
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { businessId, customerName, customerPhone, customerEmail, message } =
      req.body;

    // Check if business exists
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    const lead = await Lead.create({
      businessId,
      customerName,
      customerPhone,
      customerEmail,
      message,
    });

    // Populate business details
    await lead.populate("businessId", "name category");

    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/leads
// @desc    Get all leads (Admin only)
// @access  Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const leads = await Lead.find()
      .populate("businessId", "name category location phone")
      .sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/leads/business/:businessId
// @desc    Get leads for a specific business
// @access  Private (Business Owner)
router.get("/business/:businessId", protect, async (req, res) => {
  try {
    const business = await Business.findById(req.params.businessId);

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
        .json({ message: "Not authorized to view these leads" });
    }

    const leads = await Lead.find({ businessId: req.params.businessId }).sort({
      createdAt: -1,
    });

    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/leads/:id
// @desc    Update lead status
// @access  Private
router.put("/:id", protect, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate("businessId");

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // Check if user owns the business or is admin
    if (
      lead.businessId.userId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this lead" });
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    ).populate("businessId", "name category");

    res.json(updatedLead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
