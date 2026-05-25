import React, {
  useState,
} from "react";


function AppointmentForm() {

  const [formData, setFormData] =
    useState({
      patientId: "",
      doctorId: "",
    });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };


  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(formData);
  };


  return (

    <form
      className="appointment-form"
      onSubmit={handleSubmit}
    >

      <input
        type="number"
        name="patientId"
        placeholder="Patient ID"
        onChange={handleChange}
      />

      <input
        type="number"
        name="doctorId"
        placeholder="Doctor ID"
        onChange={handleChange}
      />

      <button type="submit">
        Submit
      </button>

    </form>
  );
}

export default AppointmentForm;