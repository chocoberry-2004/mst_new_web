import Achievement from "../models/achievements.js"

// CREATE
export const createAchievement = async (req, res) => {
  try {
    const data = req.body;
    
    // Handle files if they exist
    if (req.files) {
      if (req.files.image) data.imageUrl = `uploads/${req.files.image[0].filename}`;
      if (req.files.video) data.videoUrl = `uploads/${req.files.video[0].filename}`;
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
    const updated = await Achievement.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE
export const deleteAchievement = async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Achievement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};