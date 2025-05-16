const { ContactInformation } = require("../Models");

// Create a new ContactInformation  entry
const createContactInformation = async (req, res) => {
  try {
    const {
      NameText,
      EmailText,
      SubjectText,
      MessageText,
      ButtonText,
      userId,
    } = req.body;

    const contactInformation = await ContactInformation.create({
      NameText,
      EmailText,
      SubjectText,
      MessageText,
      ButtonText,
      userId,
    });
    return res.status(201).json(contactInformation);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a single ContactInformation entry by ID
const getContactInformationById = async (req, res) => {
  try {
    const { id } = req.params;
    const contactInformation = await ContactInformation.findOne({
      where: { userId:id },
    });
    if (contactInformation) {
      return res.status(200).json(contactInformation);
    }
    return res.status(404).json({ message: "Contact Information not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update an existing contactInformationentry
const updateContactInformation = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      NameText,
      EmailText,
      SubjectText,
      MessageText,
      ButtonText,
      userId,
    } = req.body;
    const contactInformation = await ContactInformation.findOne({
      where: { userId:id },
    });

    if (contactInformation) {
      await contactInformation.update({
        NameText,
        EmailText,
        SubjectText,
        MessageText,
        ButtonText,
        userId,
      });
      return res.status(200).json(contactInformation);
    }
    return res.status(404).json({ message: "Contact Information not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete an ContactInformation entry
const deleteContactInformation = async (req, res) => {
  try {
    const { id } = req.params;
    const contactInformation = await ContactInformation.findOne({
      where: { userId:id },
    });

    if (contactInformation) {
      await contactInformation.destroy();
      return res
        .status(200)
        .json({ message: "contact Information deleted successfully" });
    }
    return res.status(404).json({ message: "contact Information not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createContactInformation,
  getContactInformationById,
  updateContactInformation,
  deleteContactInformation,
};
