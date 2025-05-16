const express = require('express');
const router = express.Router();
const notificationController = require('../Controllers/notificationsController');

 router.get('/:userId/:fullname', notificationController.getNotificationsByIdUser);

 router.delete('/unsetNotif/:userId/:fullname', notificationController.deleteNotifications);




module.exports = router;