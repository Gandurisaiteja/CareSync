const Doctor = require(
  "../models/Doctor"
);


// CREATE PROFILE
const createDoctorProfile =
  async (req, res) => {

    try {

      const {
        userId,
        specialization,
        experience,
        availableDays,
        availableTime,
      } = req.body;

      const doctor =
        await Doctor.create({
          userId,
          specialization,
          experience,
          availableDays,
          availableTime,
        });

      res.status(201).json({
        success: true,
        doctor,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };


// GET ALL DOCTORS
const getDoctors = async (
  req,
  res
) => {

  try {

    const doctors =
      await Doctor.findAll();

    res.status(200).json({
      success: true,
      doctors,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const Appointment =
  require("../models/Appointment");


const getDoctorSchedule =
  async (req, res) => {

    try {

      const doctorId =
        req.user.id;

      const appointments =
        await Appointment.findAll({
          where: {
            doctorId,
          },
          order: [
            ["appointmentDate", "ASC"],
          ],
        });

      res.status(200).json({
        success: true,
        appointments,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  createDoctorProfile,
  getDoctors,
  getDoctorSchedule,
};