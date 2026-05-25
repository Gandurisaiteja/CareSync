const express = require("express");

const router = express.Router();

const {
  createDoctorProfile,
  getDoctors,getDoctorSchedule,
} = require(
  "../controllers/doctorController"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const roleMiddleware =
  require(
    "../middleware/roleMiddleware"
  );

// CREATE DOCTOR PROFILE
router.post(
  "/profile",
  authMiddleware,
  createDoctorProfile
);


// GET ALL DOCTORS
router.get(
  "/",
  authMiddleware,
  getDoctors
);

router.get(
  "/schedule",
  authMiddleware,
  roleMiddleware("doctor"),
  getDoctorSchedule
);

module.exports = router;