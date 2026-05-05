const express = require('express');
const router = express.Router();
const {
  getMyNotifications, markAsRead, markAllAsRead, deleteNotification, getUnreadCount
} = require('../controllers/notification.controller');

router.get('/', getMyNotifications);
router.put('/read-all', markAllAsRead);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteNotification);
router.get('/unread-count', getUnreadCount);

module.exports = router;
