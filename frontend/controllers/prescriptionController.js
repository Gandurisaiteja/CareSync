const Prescription = require(
  "../models/Prescription"
);


// ADD PRESCRIPTION
const addPrescription = async (
  req,
  res
) => {

  try {

    const {
      patientId,
      doctorId,
      medicines,
      dosage,
      instructions,
    } = req.body;

    // validation
    if (
      !patientId ||
      !doctorId ||
      !medicines ||
      !dosage
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const prescription =
      await Prescription.create({
        patientId,
        doctorId,
        medicines,
        dosage,
        instructions,
      });

    res.status(201).json({
      success: true,
      message:
        "Prescription added successfully",
      prescription,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// GET PRESCRIPTIONS
const getPrescriptions =
async(req,res)=>{

try{

let whereClause = {};

if(
req.user.role ===
"patient"
){

whereClause.patientId =
req.user.id;
}

const prescriptions =
await Prescription.findAll({
where: whereClause,
order:[
["createdAt","DESC"]
],
});

res.status(200).json({
success:true,
prescriptions,
});

}catch(error){

res.status(500).json({
success:false,
message:error.message,
});
}
};
module.exports = {
  addPrescription,
  getPrescriptions,
};