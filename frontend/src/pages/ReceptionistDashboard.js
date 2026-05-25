import React, {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";
import SearchFilter
from "../components/SearchFilter";

import AppointmentTable
from "../components/AppointmentTable";

import Pagination
from "../components/Pagination";

import "../styles/dashboard.css";

import "../styles/table.css";


function ReceptionistDashboard() {

  const [appointments,
    setAppointments] =
    useState([]);

  const [currentPage,
  setCurrentPage] =
  useState(1);

const [totalPages,
  setTotalPages] =
  useState(1);

  const [filters,
  setFilters] =
  useState({
    doctorId: "",
    patientId: "",
    status: "",
  });
 




  const updateStatus =
    async (id, status) => {

      try {

        await API.put(
          `/appointments/${id}/status`,
          { status },
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        searchAppointments();

      } catch (error) {

        console.log(error);
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
          `/appointments/search?doctorId=${filters.doctorId}&patientId=${filters.patientId}&status=${filters.status}&page=${currentPage}`,
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

  searchAppointments();

}, [currentPage]);
  return (

    <DashboardLayout>

      <div className="dashboard-page">

  <h2 className="dashboard-heading">
    Receptionist Dashboard
  </h2>


  <SearchFilter

    filters={filters}

    handleFilterChange={
      handleFilterChange
    }

    searchAppointments={
      searchAppointments
    }
  />


  <AppointmentTable
appointments={appointments}
updateStatus={updateStatus}
/>


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

export default ReceptionistDashboard;