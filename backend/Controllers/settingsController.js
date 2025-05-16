const { Settings } = require("../Models");

// Create a new Settings entry
const createSettings = async (req, res) => {
  try {
    const {
      PrimaryColor,
      SecondaryColor,
      AccueilContentPosition,
      FacebookLink,
      InstagramLink,
      LinkedinLink,
      TiktokLink,
      YoutubeLink,
      userId,
    } = req.body;
    // Handle multiple file uploads for Logo and BackgroundImage
    let Logo = null;
    let BackgroundImage = null;

    if (req.files) {
      // Iterate through uploaded files and set them based on field names
      Object.keys(req.files).forEach((fieldName) => {
        if (fieldName === "Logo") {
          Logo = `/uploads/settings/${req.files[fieldName][0].filename}`;
        } else if (fieldName === "BackgroundImage") {
          BackgroundImage = `/uploads/settings/${req.files[fieldName][0].filename}`;
        }
      });
    }

    const settings = await Settings.create({
      PrimaryColor,
      SecondaryColor,
      Logo,
      BackgroundImage,
      AccueilContentPosition,
      FacebookLink,
      InstagramLink,
      LinkedinLink,
      TiktokLink,
      YoutubeLink,
      userId,
    });
    return res.status(201).json(settings);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a single Settings entry by ID
const getSettingsById = async (req, res) => {
  try {
    const { id } = req.params;
    const settings = await Settings.findOne({
      where: { userId: id },
    });
    if (settings) {
      return res.status(200).json(settings);
    }
    return res.status(404).json({ message: "Settings not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update an existing Settings entry
const updateSettings = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      PrimaryColor,
      SecondaryColor,
      AccueilContentPosition,
      FacebookLink,
      InstagramLink,
      LinkedinLink,
      TiktokLink,
      YoutubeLink,
      userId,
    } = req.body;
   // Initialize Logo and BackgroundImage
   let Logo = null;
   let BackgroundImage = null;
   const settings = await Settings.findOne({ where: { userId: id } });

   if (!settings) {
     return res.status(404).json({ message: "Settings not found" });
   }

   // Check if files were uploaded and assign values accordingly
   if (req.files) {
     Object.keys(req.files).forEach((fieldName) => {
       if (fieldName === "Logo") {
         Logo = `/uploads/settings/${req.files[fieldName][0].filename}`;
       } else if (fieldName === "BackgroundImage") {
         BackgroundImage = `/uploads/settings/${req.files[fieldName][0].filename}`;
       }
     });
   }

   // Use existing values if new ones are not provided
   Logo = Logo || settings.Logo;
   BackgroundImage = BackgroundImage || settings.BackgroundImage;

    if (settings) {
      await settings.update({
        PrimaryColor,
        SecondaryColor,
        Logo,
        BackgroundImage,
        AccueilContentPosition,
        FacebookLink,
        InstagramLink,
        LinkedinLink,
        TiktokLink,
        YoutubeLink,
        userId,
      });
      return res.status(200).json(settings);
    }
    return res.status(404).json({ message: "Settings not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a Settings entry
const deleteSettings = async (req, res) => {
  try {
    const { id } = req.params;
    const settings = await Settings.findOne({ where: { userId: id } });

    if (settings) {
      await settings.destroy();
      return res.status(200).json({ message: "Settings deleted successfully" });
    }
    return res.status(404).json({ message: "Settings not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSettings,
  getSettingsById,
  updateSettings,
  deleteSettings,
};
