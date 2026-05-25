const express =
  require("express");

const router =
  express.Router();

const {
  addMedicalHistory,
  getMedicalHistory,
} = require(
  "../controllers/patientController"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );


router.post(
  "/history",
  authMiddleware,
  addMedicalHistory
);

router.get(
  "/:id/history",
  authMiddleware,
  getMedicalHistory
);


module.exports = router;