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

// get events by category
// export const getEventsByCategory = async (req, res) => {
//   try {
//     const { type } = req.query;
//     const query = type ? { type: type.toLowercase() } : {};

//     const events = await Event.find(query);
//     res.status(200).json(events);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// UPDATE
export const updateEvent = async (req, res) => {
  try {
    const { imageURL, ...otherData } = req.body;
    let finalData = { ...otherData };

    if (req.files && req.files.length > 0) {
      finalData.imageURL = req.files.map(
        (file) => `/uploads/events/${file.filename}`,
      );
    } else {
      // do nothing
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      finalData,
      { new: true },
    );

    if (!updatedEvent)
      return res.status(404).json({ message: "Event not found" });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
