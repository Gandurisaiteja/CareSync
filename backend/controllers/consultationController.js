const ConsultationNote =
  require(
    "../models/ConsultationNote"
  );

const MedicalHistory =
  require(
    "../models/MedicalHistory"
  );


// ADD CONSULTATION NOTE

const addConsultationNote =
  async (req, res) => {

    try {

      const {
        patientId,
        notes,
      } = req.body;


      // SAVE CONSULTATION

      const consultation =
        await ConsultationNote.create({

          patientId,

          doctorId:
            req.user.id,

          notes,
        });


      // SAVE MEDICAL HISTORY

     await MedicalHistory.create({

  patientId,

  disease: "General Consultation",

  treatment: notes,

  allergies: "",

  previousMedicines: "",
});

      res.status(201).json({
        success: true,
        message:
          "Consultation note added",
        consultation,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


// GET CONSULTATION NOTES

const getConsultationNotes =
  async (req, res) => {

    try {

      const page =
        parseInt(req.query.page) || 1;

      const limit = 5;

      const offset =
        (page - 1) * limit;


      const consultations =
        await ConsultationNote.findAll({

          limit,

          offset,

          order: [
            ["createdAt", "DESC"],
          ],
        });


      const totalConsultations =
        await ConsultationNote.count();


      res.status(200).json({
        success: true,

        consultations,

        currentPage: page,

        totalPages:
          Math.ceil(
            totalConsultations / limit
          ),
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


module.exports = {

  addConsultationNote,

  getConsultationNotes,
};