const { DataTypes } = require(
  "sequelize"
);

const sequelize = require(
  "../config/db"
);


const Doctor = sequelize.define(
  "Doctor",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    experience: {
      type: DataTypes.STRING,
    },

    availableDays: {
      type: DataTypes.STRING,
    },

    availableTime: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = Doctor;