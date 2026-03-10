import Timeline from "../models/timelines.js";

// CREATE - Add a new milestone
export const createTimeline = async (req, res) => {
  try {
    const newTimeline = new Timeline(req.body);
    const saved = await newTimeline.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// READ - Get all milestones (Sorted by year descending)
export const getTimeline = async (req, res) => {
  try {
    // Sorting by year (-1 for newest first, 1 for oldest first)
    const timeline = await Timeline.find().sort({ year: -1 });
    res.status(200).json(timeline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE - Edit a milestone
export const updateTimeline = async (req, res) => {
  try {
    const updated = await Timeline.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Milestone not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE - Remove a milestone
export const deleteTimeline = async (req, res) => {
  try {
    const deleted = await Timeline.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Milestone not found" });
    res.status(200).json({ message: "Milestone deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
