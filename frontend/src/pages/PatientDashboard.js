import React,{
useEffect,
useState,
} from "react";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/dashboardpage.css";


function PatientDashboard() {

const [appointments,
setAppointments] =
useState([]);

const [prescriptions,
setPrescriptions] =
useState([]);

const user =
JSON.parse(
localStorage.getItem("user")
);


const fetchDashboard =
async () => {

try {

const appointmentRes =
await API.get(
"/appointments",
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`,
},
}
);

const prescriptionRes =
await API.get(
"/prescriptions",
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`,
},
}
);


const appointmentData =
appointmentRes.data.appointments || [];

const prescriptionData =
prescriptionRes.data.prescriptions || [];


setAppointments(
appointmentData
);

setPrescriptions(
prescriptionData
);

} catch(error){

console.log(error);
}
};


useEffect(() => {

fetchDashboard();

}, []);


return (

<DashboardLayout>

<div className="dashboard-page">

<h2 className="dashboard-main-title">
Welcome, {user?.name}
</h2>


<div className="dashboard-cards">

<div className="dashboard-card">

<div className="card-icon blue">

<i className="fa-solid fa-calendar-check"></i>

</div>

<div>

<h3>
Appointments
</h3>

<p>
{appointments.length}
</p>

</div>

</div>


<div className="dashboard-card">

<div className="card-icon green">

<i className="fa-solid fa-prescription"></i>

</div>

<div>

<h3>
Prescriptions
</h3>

<p>
{prescriptions.length}
</p>

</div>

</div>


<div className="dashboard-card">

<div className="card-icon orange">

<i className="fa-solid fa-bell"></i>

</div>

<div>

<h3>
Notifications
</h3>

<p>
Active
</p>

</div>

</div>

</div>


<div className="recent-section">

<h3>
Recent Appointments
</h3>

<div className="recent-list">

{Array.isArray(appointments) &&
appointments.slice(0,3).map(
(item) => (

<div
key={item.id}
className="recent-card"
>

<div>

<h4>
{item.appointmentDate}
</h4>

<p>
{item.appointmentTime}
</p>

</div>

<span className="status-badge">

{item.status}

</span>

</div>
)
)}

</div>

</div>

</div>

</DashboardLayout>
);
}

export default PatientDashboard;