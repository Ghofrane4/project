const { Service } = require('../Models');

// Create a new Service
const createService = async (req, res) => {
  try {
    const { Title, Description, Icon, userId } = req.body;
    const service = await Service.create({
      Title,
      Description,
      Icon,
      userId,
    });
    return res.status(201).json(service);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all Services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a single Service by ID
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findOne({
      where: { id },
    });
    if (service) {
      return res.status(200).json(service);
    }
    return res.status(404).json({ message: 'Service not found' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update an existing Service
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { Title, Description, Icon, userId } = req.body;
    const service = await Service.findOne({ where: { id } });

    if (service) {
      await service.update({
        Title,
        Description,
        Icon,
        userId,
      });
      return res.status(200).json(service);
    }
    return res.status(404).json({ message: 'Service not found' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a Service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findOne({ where: { id } });

    if (service) {
      await service.destroy();
      return res.status(200).json({ message: 'Service deleted successfully' });
    }
    return res.status(404).json({ message: 'Service not found' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
