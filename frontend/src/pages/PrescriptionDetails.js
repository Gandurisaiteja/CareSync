import React, {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";
import jsPDF from "jspdf";
import DashboardLayout from "../layouts/DashboardLayout";

import Pagination from "../components/Pagination";
import "../styles/prescription.css";


function PrescriptionDetails() {

  const [prescriptions,
    setPrescriptions] =
    useState([]);

  const [formData, setFormData] =
    useState({
      patientId: "",
      doctorId: "",
      medicines: "",
      dosage: "",
      instructions: "",
    });

    const [currentPage,
  setCurrentPage] =
  useState(1);

    const [totalPages,
  setTotalPages] =
  useState(1);

  const fetchPrescriptions =
    async () => {

      try {

        const response =
          await API.get(
            `/prescriptions?page=${currentPage}`,
            {
              headers: {
                Authorization:
                  `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

        setPrescriptions(
          response.data.prescriptions
        );

        setCurrentPage(
        response.data.currentPage
        );

        setTotalPages(
        response.data.totalPages
        );

      } catch (error) {

        console.log(error);
      }
    };


        useEffect(() => {

        fetchPrescriptions();

        }, [currentPage]);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };


  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      const response =
        await API.post(
          "/prescriptions",
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

      alert(
        response.data.message
      );

      fetchPrescriptions();

      setFormData({
        patientId: "",
        doctorId: "",
        medicines: "",
        dosage: "",
        instructions: "",
      });

    } catch (error) {

      alert(
        error.response.data.message
      );
    }
  };


  const downloadPDF =
  (prescription) => {

    const doc =
      new jsPDF();

    doc.setFontSize(20);

    doc.text(
      "CareSync Prescription",
      20,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Patient ID: ${prescription.patientId}`,
      20,
      40
    );

    doc.text(
      `Doctor ID: ${prescription.doctorId}`,
      20,
      50
    );

    doc.text(
      `Medicines: ${prescription.medicines}`,
      20,
      60
    );

    doc.text(
      `Dosage: ${prescription.dosage}`,
      20,
      70
    );

    doc.text(
      `Instructions: ${prescription.instructions}`,
      20,
      80
    );

    doc.text(
      `Date: ${new Date(
        prescription.createdAt
      ).toLocaleString()}`,
      20,
      90
    );

    doc.save(
      `prescription-${prescription.id}.pdf`
    );
  };
  return (

    <DashboardLayout>

      <div className="prescription-page">

        <h2 className="prescription-title">
          Prescription Management
        </h2>

        <form
          className="prescription-form"
          onSubmit={handleSubmit}
        >

          <input
            type="number"
            name="patientId"
            className="prescription-input"
            placeholder="Patient ID"
            value={formData.patientId}
            onChange={handleChange}
          />

          <input
            type="number"
            name="doctorId"
            className="prescription-input"
            placeholder="Doctor ID"
            value={formData.doctorId}
            onChange={handleChange}
          />

          <textarea
            name="medicines"
            className="prescription-textarea"
            placeholder="Medicines"
            value={formData.medicines}
            onChange={handleChange}
          ></textarea>

          <input
            type="text"
            name="dosage"
            className="prescription-input"
            placeholder="Dosage"
            value={formData.dosage}
            onChange={handleChange}
          />

          <textarea
            name="instructions"
            className="prescription-textarea"
            placeholder="Instructions"
            value={formData.instructions}
            onChange={handleChange}
          ></textarea>

          <button
            type="submit"
            className="prescription-button"
          >

            Add Prescription

          </button>

        </form>

        <div className="prescription-list">

          {prescriptions.map(
            (prescription) => (

              <div
                className="prescription-card"
                key={prescription.id}
              >

                <h3>
                  Medicines
                </h3>

                <p>
                  {
                    prescription.medicines
                  }
                </p>

                <h4>
                  Dosage
                </h4>

                <p>
                  {
                    prescription.dosage
                  }
                </p>

                <h4>
                  Instructions
                </h4>

                <p>
                  {
                    prescription.instructions
                  }
                </p>

                <button
                className="appointment-button"
                onClick={() =>
                    downloadPDF(
                    prescription
                    )
                }
                >

                Download PDF

                </button>

              </div>
            )
          )}

        </div>

        <Pagination

            currentPage={currentPage}

            totalPages={totalPages}

            setCurrentPage={
                setCurrentPage
            }
            />

      </div>

    </DashboardLayout>
  );
}

export default PrescriptionDetails;