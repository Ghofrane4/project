const { AboutUs } = require("../Models");

// Create a new AboutUs entry
const createAboutUs = async (req, res) => {
  try {
    const { Title, Description, BannerTitle, BannerDescription, userId } =
      req.body;
    // Handle image upload
    const BannerImage = req.file
      ? `/uploads/aboutus/${req.file.filename}`
      : null;

    const aboutUs = await AboutUs.create({
      Title,
      Description,
      BannerTitle,
      BannerDescription,
      BannerImage,
      userId,
    });
    return res.status(201).json(aboutUs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a single AboutUs entry by ID
const getAboutUsById = async (req, res) => {
  try {
    const { id } = req.params;
    const aboutUs = await AboutUs.findOne({
      where: { userId: id },
    });
    if (aboutUs) {
      return res.status(200).json(aboutUs);
    }
    return res.status(404).json({ message: "AboutUs not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update an existing AboutUs entry
const updateAboutUs = async (req, res) => {
  try {
    const { id } = req.params;
    const aboutUs = await AboutUs.findOne({ where: { userId: id } });

    const BannerImage = req.file
      ? `/uploads/aboutus/${req.file.filename}`
      : aboutUs.BannerImage;
    const {
      Title,
      Description,
      BannerTitle,
      BannerDescription,
      userId,
    } = req.body;

    if (aboutUs) {
      const Image=''
      await aboutUs.update({
        Title,
        Description,
        BannerTitle,
        BannerDescription,
        BannerImage,
        userId,
      });
      return res.status(200).json(aboutUs);
    }
    return res.status(404).json({ message: "AboutUs not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete an AboutUs entry
const deleteAboutUs = async (req, res) => {
  try {
    const { id } = req.params;
    const aboutUs = await AboutUs.findOne({ where: { userId:id } });

    if (aboutUs) {
      await aboutUs.destroy();
      return res.status(200).json({ message: "AboutUs deleted successfully" });
    }
    return res.status(404).json({ message: "AboutUs not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAboutUs,
  getAboutUsById,
  updateAboutUs,
  deleteAboutUs,
};
