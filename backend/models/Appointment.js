const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");


const Appointment = sequelize.define(
  "Appointment",
  {
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    appointmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    appointmentTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    reason: {
      type: DataTypes.TEXT,
    },

    status: {
      type: DataTypes.ENUM(
        "Scheduled",
        "Confirmed",
        "Completed",
        "Cancelled",
        "Missed"
      ),

      defaultValue: "Scheduled",
    },
  },
  {
    timestamps: true,
  }
);


module.exports = Appointment;