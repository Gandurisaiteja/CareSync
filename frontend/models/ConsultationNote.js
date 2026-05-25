const { DataTypes } = require(
  "sequelize"
);

const sequelize = require(
  "../config/db"
);


const ConsultationNote =
  sequelize.define(
    "ConsultationNote",
    {
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      notes: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );


module.exports = ConsultationNote;