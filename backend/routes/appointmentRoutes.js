const express = require("express");

const router = express.Router();

const {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,searchAppointments,
} = require(
  "../controllers/appointmentController"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const roleMiddleware = require(
  "../middleware/roleMiddleware"
);


// CREATE APPOINTMENT
router.post(
  "/",
  authMiddleware,
  roleMiddleware("patient"),
  createAppointment
);


// GET ALL APPOINTMENTS
router.get(
  "/",
  authMiddleware,
  getAppointments
);


// UPDATE STATUS
router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware(
    "doctor",
    "receptionist"
  ),
  updateAppointmentStatus
);

router.get(
  "/search",
  authMiddleware,
  searchAppointments
);

module.exports = router;