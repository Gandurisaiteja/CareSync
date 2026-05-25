import React, {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import Pagination from "../components/Pagination";

import "../styles/prescription.css";


function DoctorConsultation() {

  const [notes,
    setNotes] =
    useState([]);

  const [formData,
    setFormData] =
    useState({
      patientId: "",
      notes: "",
    });
    
    const [currentPage,
  setCurrentPage] =
  useState(1);

    const [totalPages,
  setTotalPages] =
  useState(1);

  const fetchNotes =
    async () => {

      try {

        const response =
          await API.get(
           `/consultations?page=${currentPage}`,
            {
              headers: {
                Authorization:
                  `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

        setNotes(
          response.data.consultations
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

  fetchNotes();

}, [currentPage]);


  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };


  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await API.post(
            "/consultations",
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

        fetchNotes();

        setFormData({
          patientId: "",
          notes: "",
        });

      } catch (error) {

        alert(
          error.response.data.message
        );
      }
    };


  return (

    <DashboardLayout>

      <div className="prescription-page">

        <h2 className="prescription-title">
          Consultation Notes
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

          <textarea
            name="notes"
            className="prescription-textarea"
            placeholder="Consultation Notes"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>

          <button
            type="submit"
            className="prescription-button"
          >

            Save Consultation

          </button>

        </form>


        <div className="prescription-list">

          {notes.map((note) => (

            <div
              key={note.id}
              className="prescription-card"
            >

              <h3>
                Patient ID:
                {" "}
                {note.patientId}
              </h3>

              <p>
                {note.notes}
              </p>

            </div>
          ))}

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

export default DoctorConsultation;