import React, {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import AppointmentTable from "../components/AppointmentTable";

import "../styles/appointment.css";


function BookAppointment() {

  const [appointments,
    setAppointments] =
    useState([]);

  const [formData, setFormData] =
    useState({
      patientId: "",
      doctorId: "",
      appointmentDate: "",
      appointmentTime: "",
      reason: "",
    });
   const [filters,
  setFilters] =
  useState({
    doctorId: "",
    patientId: "",
    status: "",
  });

  const fetchAppointments =
    async () => {

      try {

        const response =
          await API.get(
            "/appointments",
            {
              headers: {
                Authorization:
                  `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

        setAppointments(
          response.data.appointments
        );

      } catch (error) {

        console.log(error);
      }
    };


  useEffect(() => {

    fetchAppointments();

  }, []);


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
          "/appointments",
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(formData);

      alert(response.data.message);

    window.location.reload();

      setFormData({
        patientId: "",
        doctorId: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
      });

    } catch (error) {

      alert(
        error.response.data.message
      );
    }
  };
    const handleFilterChange =
  (e) => {

    setFilters({
      ...filters,
      [e.target.name]:
        e.target.value,
    });
  };


const searchAppointments =
  async () => {

    try {

      const response =
        await API.get(
          `/appointments/search?doctorId=${filters.doctorId}&patientId=${filters.patientId}&status=${filters.status}`,
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

      setAppointments(
        response.data.appointments
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <DashboardLayout>

      <div className="appointment-page">

        <h2 className="appointment-title">
          Book Appointment
        </h2>

        <form
          className="appointment-form"
          onSubmit={handleSubmit}
        >

          <input
            type="number"
            name="patientId"
            className="appointment-input"
            placeholder="Patient ID"
            value={formData.patientId}
            onChange={handleChange}
          />

          <input
            type="number"
            name="doctorId"
            className="appointment-input"
            placeholder="Doctor ID"
            value={formData.doctorId}
            onChange={handleChange}
          />

          <input
            type="date"
            name="appointmentDate"
            className="appointment-input"
            value={
              formData.appointmentDate
            }
            onChange={handleChange}
          />

          <input
            type="time"
            name="appointmentTime"
            className="appointment-input"
            value={formData.appointmentTime}
            onChange={handleChange}
            />

          <textarea
            name="reason"
            className="appointment-textarea"
            placeholder="Reason"
            value={formData.reason}
            onChange={handleChange}
          ></textarea>

          <button
            type="submit"
            className="appointment-button"
          >

            Book Appointment

          </button>

        </form>

        <AppointmentTable
          appointments={
            appointments
          }
        />

      </div>

    </DashboardLayout>
  );
}

export default BookAppointment;