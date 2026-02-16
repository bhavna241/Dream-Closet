const express = require("express");
const router = express.Router();
const Dream = require("../models/Dream");

router.post("/add", async (req, res) => {
    try {
        const dream = new Dream(req.body);
        await dream.save();
        res.json(dream);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const dreams = await Dream.find();
        res.json(dreams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//marke completed dreams......
router.put("/complete/:id", async (req, res) => {
    try {
        const dream = await Dream.findByIdAndUpdate(
            req.params.id,
            { completed: true },
            { new: true }
        );

        res.json(dream);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete dream route.......
router.delete("/:id", async (req, res) => {
    try {
        await Dream.findByIdAndDelete(req.params.id);
        res.json({ message: "Dream deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
