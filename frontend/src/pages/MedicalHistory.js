import React, {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import Pagination from "../components/Pagination"; 

import "../styles/history.css";


function MedicalHistory() {

  const [history,
    setHistory] =
    useState([]);
 
    const [currentPage,
    setCurrentPage] =
    useState(1);

    const [totalPages,
    setTotalPages] =
    useState(1);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );


  const fetchHistory =
    async () => {

      try {

        const response =
          await API.get(
            `/patients/${user.id}/history?page=${currentPage}`,
            {
              headers: {
                Authorization:
                  `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

        setHistory(
          response.data.history
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

    fetchHistory();

  }, [currentPage]);


  return (

    <DashboardLayout>

      <div className="history-page">

        <h2 className="history-title">
          Medical History
        </h2>

        <div className="history-list">

          {history.map((item) => (

            <div
              className="history-card"
              key={item.id}
            >

              <h3>
                Disease
                </h3>

                <p>
                {item.disease}
                </p>

                <h4>
                Treatment
                </h4>

                <p>
                {item.treatment}
                </p>

              <p>
                {new Date(
                    item.createdAt
                    ).toLocaleString()}
              </p>

            </div>
          ))}

        </div>
          
        
      </div>
          <Pagination

  currentPage={currentPage}

  totalPages={totalPages}

  setCurrentPage={
    setCurrentPage
  }
/>
    </DashboardLayout>
  );
}

export default MedicalHistory;