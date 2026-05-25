const roleMiddleware = (...roles) => {

  return (req, res, next) => {

    try {

      // check role
      if (
        !roles.includes(req.user.role)
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Access denied",
        });
      }

      next();

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };
};


module.exports = roleMiddleware;