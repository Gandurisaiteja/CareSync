const { DataTypes } = require(
  "sequelize"
);

const sequelize = require(
  "../config/db"
);


const MedicalHistory =
  sequelize.define(
    "MedicalHistory",
    {
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      disease: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      treatment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      allergies: {
        type: DataTypes.STRING,
      },

      previousMedicines: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
    }
  );


module.exports = MedicalHistory;