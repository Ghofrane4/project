
const { Notification } = require("../Models");

exports.getNotificationsByIdUser = async (req, res) => {
  const { userId, fullname } = req.params; // Récupération des paramètres d'URL

  try {
    const notifications = await Notification.findAll({
      where: {
        userId: userId,
        fullname: fullname
      }
    });

    return res.status(200).json({
      notificationCount: notifications.length,
      notifications
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


exports.deleteNotifications = async (req, res) => {
  const { userId, fullname } = req.params;

  try {
    const result = await Notification.destroy({
      where: { userId: userId, fullname: fullname }
    });

    if (result === 0) {
      return res.status(404).json({ message: "Aucune notification trouvée à supprimer." });
    }

    return res.status(200).json({ message: "Notifications supprimées avec succès." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};




