const { DataTypes } = require(
  "sequelize"
);

const sequelize = require(
  "../config/db"
);


const Prescription =
  sequelize.define(
    "Prescription",
    {
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      medicines: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      dosage: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      instructions: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
    }
  );


module.exports = Prescription;