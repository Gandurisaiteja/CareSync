import React, {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/prescription.css";


function Notifications() {

  const [notifications,
    setNotifications] =
    useState([]);


  const fetchNotifications =
    async () => {

      try {

        const response =
          await API.get(
            "/notifications",
            {
              headers: {
                Authorization:
                  `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

        setNotifications(
          response.data.notifications
        );

      } catch (error) {

        console.log(error);
      }
    };


  useEffect(() => {

    fetchNotifications();

  }, []);


  return (

    <DashboardLayout>

      <div className="prescription-page">

        <h2 className="prescription-title">
          Notifications
        </h2>

        <div className="prescription-list">

          {notifications.map(
            (notification) => (

              <div
                key={notification.id}
                className="prescription-card"
              >

                <h3>
                  Appointment Reminder
                </h3>

                <p>
                  {
                    notification.message
                  }
                </p>

                <small>

                  {new Date(
                    notification.createdAt
                  ).toLocaleString()}

                </small>

              </div>
            )
          )}

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Notifications;