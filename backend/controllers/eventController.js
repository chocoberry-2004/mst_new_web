import Event from "../models/events.js";

// CREATE
export const createEvent = async (req, res) => {
  try {
    const eventData = { ...req.body };

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      eventData.imageURL = req.files.map(
        (file) => `/uploads/events/${file.filename}`,
      );
    } else {
      eventData.imageURL = [];
    }

    // if (req.files.video && req.files.video.length > 0) {
    //   eventData.videoURL = req.files.video[0].path;
    // }

    const newEvent = new Event(eventData);
    const savedEvent = await newEvent.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Create Event Error:", error);

    res.status(500).json({
      message: "Failed to create event",
      error: error.message,
    });
  }
};

// READ - Get all events (with optional status and type filter)
export const getEvents = async (req, res) => {
  try {
    const { type, status } = req.query;
    let query = {};
    if (type) {
      query.type = type.toUpperCase();
    }

    if (status) {
      query.status = status.toLowerCase();
    }

    const events = await Event.find(query).sort({ createdAt: -1 });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateEvent = async (req, res) => {
  try {
    console.log("Files:", req.files);
    console.log("Body:", req.body);

    const { existingImages, deletedImages, ...otherData } = req.body;

    let finalImages = [];

    // 1. Keep existing images
    if (existingImages) {
      finalImages = Array.isArray(existingImages)
        ? existingImages
        : JSON.parse(existingImages);
    }

    // 2. Remove deleted images
    if (deletedImages) {
      const toDelete = Array.isArray(deletedImages)
        ? deletedImages
        : JSON.parse(deletedImages);

      finalImages = finalImages.filter((img) => !toDelete.includes(img));
    }

    // 3. Add new uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(
        (file) => `/uploads/events/${file.filename}`,
      );
      finalImages = [...finalImages, ...newImages];
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        ...otherData,
        imageURL: finalImages,
      },
      { new: true },
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
