import React, {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/dashboard.css";
import "../styles/dashboardpage.css";
import "../styles/table.css";


function AdminDashboard() {

  const [analytics,
    setAnalytics] =
    useState({});


  const fetchAnalytics =
    async () => {

      try {

        const response =
          await API.get(
            "/dashboard/clinic",
            {
              headers: {
                Authorization:
                  `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

        setAnalytics(
          response.data.analytics
        );

      } catch (error) {

        console.log(error);
      }
    };


  useEffect(() => {

    fetchAnalytics();

  }, []);


  return (

    <DashboardLayout>

      <div className="dashboard-page">

        <h2 className="dashboard-main-title">
          Admin Dashboard
        </h2>


        {/* TOP ANALYTICS */}

       <div className="dashboard-cards">

        <div className="dashboard-card">

        <div className="card-icon blue">

        <i className="fa-solid fa-hospital-user"></i>

        </div>

        <div>

        <h3>
        Total Patients
        </h3>

        <p>
        {analytics.totalPatients}
        </p>

        </div>

        </div>


        <div className="dashboard-card">

        <div className="card-icon green">

        <i className="fa-solid fa-user-doctor"></i>

        </div>

        <div>

        <h3>
        Total Doctors
        </h3>

        <p>
        {analytics.totalDoctors}
        </p>

        </div>

        </div>


        <div className="dashboard-card">

        <div className="card-icon orange">

        <i className="fa-solid fa-calendar-days"></i>

        </div>

        <div>

        <h3>
        Appointments
        </h3>

        <p>
        {analytics.totalAppointments}
        </p>

        </div>

        </div>


        <div className="dashboard-card">

        <div className="card-icon purple">

        <i className="fa-solid fa-file-prescription"></i>

        </div>

        <div>

        <h3>
        Prescriptions
        </h3>

        <p>
        {analytics.totalPrescriptions}
        </p>

        </div>

        </div>

        </div>


        {/* STATUS ANALYTICS */}

       <div className="dashboard-cards">

                <div className="dashboard-card">

                <div className="card-icon blue">

                <i className="fa-solid fa-hourglass-start"></i>

                </div>

                <div>

                <h3>
                Scheduled
                </h3>

                <p>
                {analytics.scheduledAppointments}
                </p>

                </div>

                </div>


                <div className="dashboard-card">

                <div className="card-icon green">

                <i className="fa-solid fa-circle-check"></i>

                </div>

                <div>

                <h3>
                Confirmed
                </h3>

                <p>
                {analytics.confirmedAppointments}
                </p>

                </div>

                </div>


                <div className="dashboard-card">

                <div className="card-icon purple">

                <i className="fa-solid fa-check-double"></i>

                </div>

                <div>

                <h3>
                Completed
                </h3>

                <p>
                {analytics.completedAppointments}
                </p>

                </div>

                </div>


                <div className="dashboard-card">

                <div className="card-icon orange">

                <i className="fa-solid fa-circle-xmark"></i>

                </div>

                <div>

                <h3>
                Cancelled
                </h3>

                <p>
                {analytics.cancelledAppointments}
                </p>

                </div>

                </div>

                </div>


        {/* RECENT APPOINTMENTS */}

       <div className="recent-section">

<h3>
Recent Appointments
</h3>

<div className="admin-table-scroll">

<table className="appointment-table">

<thead>

<tr>

<th>ID</th>
<th>Patient</th>
<th>Doctor</th>
<th>Date</th>
<th>Status</th>

</tr>

</thead>
<tbody>

{analytics.recentAppointments?.map(
(item) => (

<tr key={item.id}>

<td>{item.id}</td>

<td>{item.patientId}</td>

<td>{item.doctorId}</td>

<td>{item.appointmentDate}</td>

<td>

<span
className={`status-badge status-${item.status.toLowerCase()}`}
>

{item.status}

</span>

</td>

</tr>
)
)}

</tbody>

</table>

</div>

</div>

      </div>

    </DashboardLayout>
  );
}

export default AdminDashboard;