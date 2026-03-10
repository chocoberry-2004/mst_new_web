import Lecturer from "../models/lecturers.js";

// CREATE - Add a new lecturer with a profile image
export const createLecturer = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.profileImageURL = `/uploads/lecturers/${req.file.filename}`;
    }

    const newLecturer = new Lecturer(data);
    const saved = await newLecturer.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// READ - Get all lecturers
export const getLecturers = async (req, res) => {
  try {
    const lecturers = await Lecturer.find().sort({ createdAt: -1 });
    res.status(200).json(lecturers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE - Update lecturer details or image
export const updateLecturer = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.profileImageURL = `/uploads/lecturers/${req.file.filename}`;
    }

    const updated = await Lecturer.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Lecturer not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE - Remove a lecturer
export const deleteLecturer = async (req, res) => {
  try {
    const deleted = await Lecturer.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Lecturer not found" });
    res.status(200).json({ message: "Lecturer profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
