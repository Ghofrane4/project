const { SectionContent } = require("../Models");

// Create a new SectionContent entry
const createSectionContent = async (req, res) => {
  try {
    const {
      AccueilTitle,
      AccueilDescription,
      ProductTitle,
      ProductDescription,
      ServiceTitle,
      ServiceDescription,
      ContactTitle,
      ContactDescription,
      HomeNameLink,
      AboutUsNameLink,
      ProductNameLink,
      ServiceNameLink,
      ContactNameLink,
      userId,
    } = req.body;

    const sectionContent = await SectionContent.create({
      AccueilTitle,
      AccueilDescription,
      ProductTitle,
      ProductDescription,
      ServiceTitle,
      ServiceDescription,
      ContactTitle,
      ContactDescription,
      HomeNameLink,
      AboutUsNameLink,
      ProductNameLink,
      ServiceNameLink,
      ContactNameLink,
      userId,
    });

    // Return a successful response with the created section content 🎉
    return res.status(201).json(sectionContent);
  } catch (error) {
    // Handle any errors that may occur 😓
    return res.status(500).json({ error: error.message });
  }
};


// Get a single SectionContent entry by ID 🔍
const getSectionContentByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const sectionContent = await SectionContent.findOne({
      where: { userId: id },
    });

    if (sectionContent) {
      return res.status(200).json(sectionContent); // Found the section content ✅
    }

    return res.status(404).json({ message: "SectionContent not found" }); // Not found ❌
  } catch (error) {
    return res.status(500).json({ error: error.message }); // Handle errors 🛑
  }
};

// Update an existing SectionContent entry ✏️
const updateSectionContent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      AccueilTitle,
      AccueilDescription,
      ProductTitle,
      ProductDescription,
      ServiceTitle,
      ServiceDescription,
      ContactTitle,
      ContactDescription,
      HomeNameLink,
      AboutUsNameLink,
      ProductNameLink,
      ServiceNameLink,
      ContactNameLink,
      userId,
    } = req.body;

    const sectionContent = await SectionContent.findOne({
      where: { userId: id },
    });

    if (sectionContent) {
      await sectionContent.update({
        AccueilTitle,
        AccueilDescription,
        ProductTitle,
        ProductDescription,
        ServiceTitle,
        ServiceDescription,
        ContactTitle,
        ContactDescription,
        HomeNameLink,
        AboutUsNameLink,
        ProductNameLink,
        ServiceNameLink,
        ContactNameLink,
        userId,
      });

      return res.status(200).json(sectionContent); // Successfully updated ✅
    }

    return res.status(404).json({ message: "SectionContent not found" }); // Not found ❌
  } catch (error) {
    return res.status(500).json({ error: error.message }); // Handle errors 🛑
  }
};

// Delete a SectionContent entry 🗑️
const deleteSectionContent = async (req, res) => {
  try {
    const { id } = req.params;
    const sectionContent = await SectionContent.findOne({ where: { userId:id } });

    if (sectionContent) {
      await sectionContent.destroy();
      return res
        .status(200)
        .json({ message: "SectionContent deleted successfully" }); // Successfully deleted 🗑️
    }

    return res.status(404).json({ message: "SectionContent not found" }); // Not found ❌
  } catch (error) {
    return res.status(500).json({ error: error.message }); // Handle errors 🛑
  }
};

module.exports = {
  createSectionContent,
  getSectionContentByUserId,
  updateSectionContent,
  deleteSectionContent,
};
