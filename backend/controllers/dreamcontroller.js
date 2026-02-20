const Dream = require("../models/Dream");

// Add Dream
exports.addDream = async (req, res) => {
    try {
        const newDream = new Dream(req.body);
        const savedDream = await newDream.save();
        res.status(201).json(savedDream);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Dreams
exports.getDreams = async (req, res) => {
    try {
        const dreams = await Dream.find();
        res.json(dreams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Dream
exports.updateDream = async (req, res) => {
    try {
        const updatedDream = await Dream.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedDream);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Dream
exports.deleteDream = async (req, res) => {
    try {
        await Dream.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Dream deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
