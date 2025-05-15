const express = require("express");
const router = express.Router();
const Sample = require("../models/Sample");

// GET all sample data
router.get("/", async (req, res) => {
  try {
    const data = await Sample.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching samples:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// POST new sample data
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const newItem = new Sample({ name });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error saving sample:", error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

module.exports = router;
