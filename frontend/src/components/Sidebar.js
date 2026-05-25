import React from "react";

import {
Link,
} from "react-router-dom";

import "../styles/sidebar.css";


function Sidebar({
sidebarOpen,
setSidebarOpen,
}) {

const user =
JSON.parse(
localStorage.getItem("user")
);

return (

<div
className={`sidebar ${
sidebarOpen
? "open"
: ""
}`}
>

<div className="sidebar-top">

<h2 className="sidebar-logo">

<i className="fa-solid fa-heart-pulse"></i>

CareSync

</h2>

<button
type="button"
className="sidebar-close-btn"
onClick={() =>
setSidebarOpen(false)
}
>

<i className="fa-solid fa-xmark"></i>

</button>

</div>


<div className="sidebar-links">

<Link
to={`/${user?.role}`}
className="sidebar-link"
>

<i className="fa-solid fa-house"></i>

Dashboard

</Link>


<Link
to="/appointments"
className="sidebar-link"
>

<i className="fa-solid fa-calendar-check"></i>

Appointments

</Link>


<Link
to="/prescriptions"
className="sidebar-link"
>

<i className="fa-solid fa-prescription"></i>

Prescriptions

</Link>


{user?.role === "patient" && (

<Link
to="/medical-history"
className="sidebar-link"
>

<i className="fa-solid fa-notes-medical"></i>

Medical History

</Link>
)}


<Link
to="/notifications"
className="sidebar-link"
>

<i className="fa-solid fa-bell"></i>

Notifications

</Link>


{user?.role === "doctor" && (

<>
<Link
to="/consultations"
className="sidebar-link"
>

<i className="fa-solid fa-stethoscope"></i>

Consultations

</Link>

<Link
to="/doctor-schedule"
className="sidebar-link"
>

<i className="fa-solid fa-user-doctor"></i>

Schedule

</Link>
</>
)}




</div>

</div>
);
}

export default Sidebar;