import Partner from "../models/partners.js";

// CREATE - Add a new partner with logo upload
export const createPartner = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.logo = `/uploads/partners/${req.file.filename}`;
    }

    const newPartner = new Partner(data);
    const saved = await newPartner.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// READ - Get all partners (with optional filtering by tier or featured)
export const getPartners = async (req, res) => {
  try {
    const { tier, featured } = req.query;
    let query = {};

    if (tier) query.tier = tier;
    if (featured) query.featured = featured === "true";

    const partners = await Partner.find(query).sort({ tier: 1 });
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE - Update partner info or logo
export const updatePartner = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.logo = `/uploads/partners/${req.file.filename}`;
    }

    const updated = await Partner.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Partner not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE - Remove a partner
export const deletePartner = async (req, res) => {
  try {
    const deleted = await Partner.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Partner not found" });
    res.status(200).json({ message: "Partner deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
