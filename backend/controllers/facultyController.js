import Faculty from "../models/faculty.js";

// CREATE Faculty
export const createFaculty = async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    const saved = await faculty.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// READ All Faculties
export const getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE Faculty (e.g., changing description)
export const updateFaculty = async (req, res) => {
  try {
    const updated = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ADD a Course to an existing Faculty
export const addCourseToFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    faculty.courses.push(req.body); // req.body should match the course object structure
    await faculty.save();
    res.status(200).json(faculty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE Faculty
export const deleteFaculty = async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Faculty removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
