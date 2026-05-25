import React from "react";

import "../styles/table.css";


function AppointmentTable({
  appointments,updateStatus,
}) {

  return (

<div className="table-container">

<div className="table-scroll">

<table className="appointment-table">

<thead>

<tr>

<th>ID</th>

<th>Patient</th>

<th>Doctor</th>

<th>Date</th>

<th>Time</th>

<th>Status</th>



</tr>

</thead>

<tbody>

{appointments.map(
(appointment) => (

<tr key={appointment.id}>

<td>
{appointment.id}
</td>

<td>
{appointment.patientId}
</td>

<td>
{appointment.doctorId}
</td>

<td>
{appointment.appointmentDate}
</td>

<td>
{appointment.appointmentTime}
</td>


<td>

{updateStatus ? (

<select
value={appointment.status}
onChange={(e) =>
updateStatus(
appointment.id,
e.target.value
)
}
className="status-select"
>

<option>
Scheduled
</option>

<option>
Confirmed
</option>

<option>
Completed
</option>

<option>
Cancelled
</option>

<option>
Missed
</option>

</select>

) : (

appointment.status

)}

</td>

</tr>
)
)}

</tbody>

</table>

</div>

</div>
);
}

export default AppointmentTable;