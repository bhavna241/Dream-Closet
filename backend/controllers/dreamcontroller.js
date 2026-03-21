const Dream = require("../models/Dream");

// 🔹 Create Dream
exports.createDream = async (req, res) => {
    try {
        const { title, description, type, priority, productLink, targetDate, imageUrl, note } = req.body;

        const dream = await Dream.create({
            title,
            description,
            type,
            priority,
            productLink,
            targetDate,
            imageUrl,
            note,
            user: req.user._id,
        });

        res.status(201).json(dream);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔹 Get All Dreams (Only Logged-in User)
exports.getDreams = async (req, res) => {
    try {
        const dreams = await Dream.find({ user: req.user._id });
        res.json(dreams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔹 Update Dream (Only If It Belongs To User)
exports.updateDream = async (req, res) => {
    try {
        const dream = await Dream.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!dream) {
            return res.status(404).json({ message: "Dream not found" });
        }

        dream.status = req.body.status ?? dream.status;
        dream.completedAt = req.body.completedAt ?? dream.completedAt;
        dream.title = req.body.title ?? dream.title;
        dream.description = req.body.description ?? dream.description;
        dream.type = req.body.type ?? dream.type;
        dream.priority = req.body.priority ?? dream.priority;
        dream.productLink = req.body.productLink ?? dream.productLink;
        dream.targetDate = req.body.targetDate ?? dream.targetDate;
        dream.imageUrl = req.body.imageUrl ?? dream.imageUrl;
        dream.note = req.body.note ?? dream.note;

        const updatedDream = await dream.save();
        res.json(updatedDream);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔹 Delete Dream (Only If It Belongs To User)
exports.deleteDream = async (req, res) => {
    try {
        const dream = await Dream.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!dream) {
            return res.status(404).json({ message: "Dream not found" });
        }

        await dream.deleteOne();
        res.status(200).json({ message: "Dream deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};