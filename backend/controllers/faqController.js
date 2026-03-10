import FAQ from "../models/faq.js";

// CREATE - Add a new question and answer
export const createFAQ = async (req, res) => {
  try {
    const newFaq = new FAQ(req.body);
    const savedFaq = await newFaq.save();
    res.status(201).json(savedFaq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ - Get all FAQs (with optional keyword search)
export const getAllFAQs = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { question: { $regex: search, $options: "i" } },
          { answer: { $regex: search, $options: "i" } },
        ],
      };
    }

    const faqs = await FAQ.find(query).sort({ createdAt: -1 });
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE - Edit a question or answer
export const updateFAQ = async (req, res) => {
  try {
    const updatedFaq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedFaq) return res.status(404).json({ message: "FAQ not found" });
    res.status(200).json(updatedFaq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE - Remove an FAQ
export const deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });
    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
