const express = require("express");

const router = express.Router();

const {
  addPrescription,
  getPrescriptions,
} = require(
  "../controllers/prescriptionController"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const roleMiddleware = require(
  "../middleware/roleMiddleware"
);


// ADD PRESCRIPTION
router.post(
  "/",
  authMiddleware,
  roleMiddleware("doctor"),
  addPrescription
);


// GET PRESCRIPTIONS
router.get(
  "/",
  authMiddleware,
  getPrescriptions
);


module.exports = router;