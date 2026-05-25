const Notification = require(
  "../models/Notification"
);


// CREATE NOTIFICATION
const createNotification =
  async (req, res) => {

    try {

      const {
        userId,
        message,
      } = req.body;

      const notification =
        await Notification.create({
          userId,
          message,
        });

      res.status(201).json({
        success: true,
        notification,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };


// GET NOTIFICATIONS
const getNotifications = async (
  req,
  res
) => {

  try {

    const notifications =
      await Notification.findAll();

    res.status(200).json({
      success: true,
      notifications,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


module.exports = {
  createNotification,
  getNotifications,
};