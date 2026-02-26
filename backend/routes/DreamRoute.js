const express = require("express");
const router = express.Router();

const {
    createDream,
    getDreams,
    updateDream,
    deleteDream,
} = require("../controllers/dreamcontroller");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createDream);
router.get("/", protect, getDreams);
router.put("/:id", protect, updateDream);
router.delete("/:id", protect, deleteDream);

module.exports = router;