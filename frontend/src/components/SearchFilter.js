import React from "react";

import "../styles/appointment.css";


function SearchFilter({

  filters,

  handleFilterChange,

  searchAppointments,
}) {

  return (

    <div className="appointment-form">

      <h3>
        Search Appointments
      </h3>

      <input
        type="number"
        name="doctorId"
        className="appointment-input"
        placeholder="Doctor ID"
        value={filters.doctorId}
        onChange={
          handleFilterChange
        }
      />

      <input
        type="number"
        name="patientId"
        className="appointment-input"
        placeholder="Patient ID"
        value={filters.patientId}
        onChange={
          handleFilterChange
        }
      />

      <select
        name="status"
        className="appointment-input"
        value={filters.status}
        onChange={
          handleFilterChange
        }
      >

        <option value="">
          All Status
        </option>

        <option value="Scheduled">
          Scheduled
        </option>

        <option value="Confirmed">
          Confirmed
        </option>

        <option value="Completed">
          Completed
        </option>

        <option value="Cancelled">
          Cancelled
        </option>

        <option value="Missed">
          Missed
        </option>

      </select>

      <button
        className="appointment-button"
        onClick={searchAppointments}
      >

        Search

      </button>

    </div>
  );
}

export default SearchFilter;