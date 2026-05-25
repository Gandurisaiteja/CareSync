const Appointment = require("../models/Appointment");
const Notification =require("../models/Notification");

// CREATE APPOINTMENT
const createAppointment = async (
  req,
  res
) => {

  try {

    const {
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
      reason,
    } = req.body;

    // validation
    if (
      !patientId ||
      !doctorId ||
      !appointmentDate ||
      !appointmentTime
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // prevent duplicate slot
    const existingAppointment =
      await Appointment.findOne({
        where: {
          doctorId,
          appointmentDate,
          appointmentTime,
        },
      });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message:
          "Doctor already booked for this slot",
      });
    }

    // create appointment
    const appointment =
      await Appointment.create({
        patientId,
        doctorId,
        appointmentDate,
        appointmentTime,
        reason,
        status: "Scheduled",
      });
      
      await Notification.create({

      userId: patientId,
      message:
        `Appointment booked on ${appointmentDate} at ${appointmentTime}`,
    });

    res.status(201).json({
      success: true,
      message:
        "Appointment booked successfully",
      appointment,
    });
    

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// GET ALL APPOINTMENTS
const getAppointments =
async (req,res) => {

try {

const page =
parseInt(req.query.page) || 1;

const limit = 5;

const offset =
(page - 1) * limit;

let whereClause = {};

if(
req.user.role ===
"patient"
){

whereClause.patientId =
req.user.id;

}else if(
req.user.role ===
"doctor"
){

whereClause.doctorId =
req.user.id;
}


const appointments =
await Appointment.findAll({
where: whereClause,
limit,
offset,
order:[
["createdAt","DESC"]
],
});


const totalAppointments =
await Appointment.count({
where: whereClause,
});


res.status(200).json({
success:true,
appointments,
currentPage:page,
totalPages:Math.ceil(
totalAppointments / limit
),
});

} catch (error) {

res.status(500).json({
success:false,
message:error.message,
});
}
};



// UPDATE APPOINTMENT STATUS
const updateAppointmentStatus =
  async (req, res) => {

    try {

      const { id } = req.params;

      const { status } = req.body;

      const appointment =
        await Appointment.findByPk(id);

      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found",
        });
      }

      appointment.status = status;

      await appointment.save();

      res.status(200).json({
        success: true,
        message:
          "Appointment status updated",
        appointment,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };
const searchAppointments =
async (req,res) => {

try {

const {
doctorId,
patientId,
status,
} = req.query;

const page =
parseInt(req.query.page) || 1;

const limit = 5;

const offset =
(page - 1) * limit;

let whereClause = {};


// SEARCH FILTERS

if (doctorId) {

whereClause.doctorId =
doctorId;
}

if (patientId) {

whereClause.patientId =
patientId;
}

if (status) {

whereClause.status =
status;
}


// ROLE FILTERS

if(
req.user.role ===
"patient"
){

whereClause.patientId =
req.user.id;

}else if(
req.user.role ===
"doctor"
){

whereClause.doctorId =
req.user.id;
}


const appointments =
await Appointment.findAll({
where: whereClause,
limit,
offset,
order:[
["createdAt","DESC"]
],
});


const totalAppointments =
await Appointment.count({
where: whereClause,
});


res.status(200).json({
success:true,
appointments,
currentPage:page,
totalPages:Math.ceil(
totalAppointments / limit
),
});

} catch (error) {

res.status(500).json({
success:false,
message:error.message,
});
}
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  searchAppointments,
};