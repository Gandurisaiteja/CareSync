const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");


// LOAD ENV VARIABLES
dotenv.config();
console.log(process.env.JWT_SECRET);

// DATABASE CONNECTION
const sequelize = require("./config/db");


// IMPORT ROUTES
const authRoutes = require(
  "./routes/authRoutes"
);

const appointmentRoutes = require(
  "./routes/appointmentRoutes"
);

const prescriptionRoutes = require(
  "./routes/prescriptionRoutes"
);

const consultationRoutes = require(
  "./routes/consultationRoutes"
);

const patientRoutes = require(
  "./routes/patientRoutes"
 );

const doctorRoutes = require(
  "./routes/doctorRoutes"
);

const dashboardRoutes = require(
  "./routes/dashboardRoutes"
);

const notificationRoutes = require(
  "./routes/notificationRoutes"
);


// IMPORT MODELS
require("./models/User");

require("./models/Doctor");

require("./models/Patient");

require("./models/Appointment");

require("./models/Prescription");

require("./models/ConsultationNote");

require("./models/MedicalHistory");

require("./models/Notification");


// CREATE APP
const app = express();


// MIDDLEWARES
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true,
}));


// TEST ROUTE
app.get("/", (req, res) => {

  res.status(200).json({
    success: true,
    message:
      "Healthcare API Running Successfully",
  });

});


// API ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/appointments",
  appointmentRoutes
);

app.use(
  "/api/prescriptions",
  prescriptionRoutes
);

app.use(
  "/api/consultations",
  consultationRoutes
);

app.use(
  "/api/patients",
  patientRoutes
);

app.use(
  "/api/doctors",
  doctorRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);


// HANDLE INVALID ROUTES
app.use((req, res) => {

  res.status(404).json({
    success: false,
    message: "Route not found",
  });

});


// DATABASE CONNECTION
sequelize
  .sync()
  .then(() => {

    console.log(
      "Database Connected Successfully"
    );

    // START SERVER
    const PORT =
      process.env.PORT || 5000;

    app.listen(PORT, () => {

      console.log(
        `Server running on port ${PORT}`
      );

    });

  })
  .catch((error) => {

    console.log(
      "Database connection failed"
    );

    console.log(error);

  });