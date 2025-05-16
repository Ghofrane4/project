const express = require("express");
const router = express.Router();
const sectionContentController = require("../Controllers/sectionContentController");

// Create SectionContent 🆕
router.post("/add", sectionContentController.createSectionContent);

// Update SectionContent by ID 🆙
router.put("/update/:id", sectionContentController.updateSectionContent);

// Get a single SectionContent entry by ID 🔍
router.get("/display/:id", sectionContentController.getSectionContentByUserId);

// Delete SectionContent by ID 🗑️
router.delete("/delete/:id", sectionContentController.deleteSectionContent);

module.exports = router;
