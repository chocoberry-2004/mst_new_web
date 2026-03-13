import Contact from "../models/contacts.js";

// GET the contact info
export const getContactInfo = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// INITIALIZE or UPDATE contact info
export const updateContactInfo = async (req, res) => {
  try {
    // This finds the first document and updates it, or creates it if it doesn't exist
    const updated = await Contact.findOneAndUpdate({}, req.body, {
      upsert: true,
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
