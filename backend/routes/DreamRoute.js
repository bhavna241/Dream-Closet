const express = require("express");
const router = express.Router();

const {
    addDream,
    getDreams,
    updateDream,
    deleteDream,
} = require("../controllers/dreamcontroller");

router.post("/add", addDream);
router.get("/", getDreams);
router.put("/:id", updateDream);
router.delete("/:id", deleteDream);

module.exports = router;
