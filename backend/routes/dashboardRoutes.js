const express =
  require("express");

const router =
  express.Router();

const {
  getClinicAnalytics,
} = require(
  "../controllers/dashboardController"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const roleMiddleware =
  require(
    "../middleware/roleMiddleware"
  );


router.get(
  "/clinic",
  authMiddleware,
  roleMiddleware("admin"),
  getClinicAnalytics
);


module.exports = router;