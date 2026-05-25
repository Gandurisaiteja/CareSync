const User =
  require("../models/User");

const Appointment =
  require("../models/Appointment");

const Prescription =
  require("../models/Prescription");


const getClinicAnalytics =
  async (req, res) => {

    try {

      // TOTAL COUNTS

      const totalPatients =
        await User.count({
          where: {
            role: "patient",
          },
        });

      const totalDoctors =
        await User.count({
          where: {
            role: "doctor",
          },
        });

      const totalAppointments =
        await Appointment.count();

      const totalPrescriptions =
        await Prescription.count();


      // APPOINTMENT STATUS ANALYTICS

      const scheduledAppointments =
        await Appointment.count({
          where: {
            status: "Scheduled",
          },
        });

      const confirmedAppointments =
        await Appointment.count({
          where: {
            status: "Confirmed",
          },
        });

      const completedAppointments =
        await Appointment.count({
          where: {
            status: "Completed",
          },
        });

      const cancelledAppointments =
        await Appointment.count({
          where: {
            status: "Cancelled",
          },
        });

      const missedAppointments =
        await Appointment.count({
          where: {
            status: "Missed",
          },
        });


      // RECENT APPOINTMENTS

      const recentAppointments =
        await Appointment.findAll({
          limit: 5,
          order: [
            ["createdAt", "DESC"],
          ],
        });


      res.status(200).json({
        success: true,

        analytics: {

          totalPatients,

          totalDoctors,

          totalAppointments,

          totalPrescriptions,

          scheduledAppointments,

          confirmedAppointments,

          completedAppointments,

          cancelledAppointments,

          missedAppointments,

          recentAppointments,
        },
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


module.exports = {
  getClinicAnalytics,
};