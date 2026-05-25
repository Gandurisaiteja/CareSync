const MedicalHistory =
  require("../models/MedicalHistory");


// ADD MEDICAL HISTORY

const addMedicalHistory =
  async (req, res) => {

    try {

      const {
        patientId,
        description,
      } = req.body;

      const history =
        await MedicalHistory.create({

          patientId,

          description,
        });

      res.status(201).json({
        success: true,
        message:
          "Medical history added",
        history,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


// GET MEDICAL HISTORY

const getMedicalHistory =
  async (req, res) => {

    try {

      const patientId =
        req.params.id;

      const history =
        await MedicalHistory.findAll({

          where: {
            patientId,
          },

          order: [
            ["createdAt", "DESC"],
          ],
        });

      res.status(200).json({
        success: true,
        history,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


module.exports = {

  addMedicalHistory,

  getMedicalHistory,
};