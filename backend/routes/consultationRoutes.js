const express =
  require("express");

const router =
  express.Router();

const {
  addConsultationNote,
  getConsultationNotes,
} = require(
  "../controllers/consultationController"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const roleMiddleware =
  require(
    "../middleware/roleMiddleware"
  );


router.post(
  "/",
  authMiddleware,
  roleMiddleware("doctor"),
  addConsultationNote
);


router.get(
  "/",
  authMiddleware,
  getConsultationNotes
);


module.exports = router;