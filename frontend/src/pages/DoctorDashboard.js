import React,{
useEffect,
useState,
} from "react";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/dashboardpage.css";


function DoctorDashboard() {


    const [appointments,
setAppointments] =
useState([]);

const user =
JSON.parse(
localStorage.getItem("user")
);


const fetchAppointments =
async () => {

try {

const response =
await API.get(
"/appointments",
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`,
},
}
);

const allAppointments =
response.data.appointments || [];

const doctorAppointments =
allAppointments.filter(
item =>
item.doctorId ===
user.id
);

setAppointments(
doctorAppointments
);

} catch(error){

console.log(error);
}
};


useEffect(() => {

fetchAppointments();

}, []);

  return (

    <DashboardLayout>

      <div className="dashboard-cards">

<div className="dashboard-card">

<div className="card-icon blue">

<i className="fa-solid fa-calendar-check"></i>

</div>

<div>

<h3>
Today's Appointments
</h3>

<p>
{
appointments.filter(
item =>
item.status ===
"Scheduled"
).length
}
</p>

</div>

</div>


<div className="dashboard-card">

<div className="card-icon green">

<i className="fa-solid fa-stethoscope"></i>

</div>

<div>

<h3>
Consultations
</h3>

<p>
{
appointments.filter(
item =>
item.status ===
"Completed"
).length
}
</p>

</div>

</div>


<div className="dashboard-card">

<div className="card-icon orange">

<i className="fa-solid fa-clock"></i>

</div>

<div>

<h3>
Pending
</h3>

<p>
{
appointments.filter(
item =>
item.status ===
"Confirmed"
).length
}
</p>

</div>

</div>

</div>


<div className="recent-section">

<h3>
Today's Schedule
</h3>

<div className="recent-list">

{
appointments.slice(0,4).map(
(item) => (

<div
key={item.id}
className="recent-card"
>

<div>

<h4>
Patient ID :
{item.patientId}
</h4>

<p>
{item.appointmentDate}
{" - "}
{item.appointmentTime}
</p>

</div>

<span
className={`status-badge status-${item.status.toLowerCase()}`}
>

{item.status}

</span>

</div>
)
)
}

</div>

</div>

    </DashboardLayout>
  );
}

export default DoctorDashboard;