import Event from "../models/events.js";

// CREATE - Post a new event with image/video
export const createEvent = async (req, res) => {
  try {
    const eventData = { ...req.body };

    // Map uploaded files to schema fields
    if (req.files) {
      if (req.files.image)
        eventData.imageURL = `/uploads/events/${req.files.image[0].filename}`;
      if (req.files.video)
        eventData.videoURL = `/uploads/events/${req.files.video[0].filename}`;
    }

    const newEvent = new Event(eventData);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ - Get all events (with optional status filter)
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

// UPDATE - Edit event details
export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedEvent)
      return res.status(404).json({ message: "Event not found" });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE - Remove an event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
