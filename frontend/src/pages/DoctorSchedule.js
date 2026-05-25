import React, {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/table.css";


function DoctorSchedule() {

  const [appointments,
    setAppointments] =
    useState([]);


  const fetchSchedule =
    async () => {

      try {

        const response =
          await API.get(
            "/doctors/schedule",
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

    fetchSchedule();

  }, []);


  return (

    <DashboardLayout>

      <h2
        className="dashboard-heading"
      >
        Doctor Schedule
      </h2>

      <div className="table-container">

        <table className="appointment-table">

          <thead>

            <tr>

              <th>ID</th>

              <th>Patient</th>

              <th>Date</th>

              <th>Time</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {appointments.map(
              (appointment) => (

                <tr
                  key={appointment.id}
                >

                  <td>
                    {appointment.id}
                  </td>

                  <td>
                    {
                      appointment.patientId
                    }
                  </td>

                  <td>
                    {
                      appointment.appointmentDate
                    }
                  </td>

                  <td>
                    {
                      appointment.appointmentTime
                    }
                  </td>

                  <td>
                    {
                      appointment.status
                    }
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default DoctorSchedule;