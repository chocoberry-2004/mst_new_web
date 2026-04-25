import Achievement from "../models/achievements.js"
import { deleteFile } from "../utils/deleteFile.js";

// CREATE
export const createAchievement = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.imageUrl = `/uploads/achievements/${req.file.filename}`;
    }

    const newAchievement = new Achievement(data);
    const saved = await newAchievement.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// READ ALL
export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ SINGLE
export const getAchievementById = async (req, res) => {
  try {
    const item = await Achievement.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const updateAchievement = async (req, res) => {
  try {
    const data = { ...req.body }
    if (req.file) data.imageUrl = `/uploads/achievements/${req.file.filename}`

    const updatedAchievement = await Achievement.findByIdAndUpdate(req.params.id, data, { new: true })

    if (!updatedAchievement) return res.status(404).json({ message: "No achievement updated found!" })

    res.status(200).json(updatedAchievement)

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE
export const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) return res.status(404).json({ message: "No achievement found to be deleted!" })

    if (achievement.imageUrl) {
      deleteFile(achievement.imageUrl)
    }

    res.status(200).json({ message: "Achievement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};