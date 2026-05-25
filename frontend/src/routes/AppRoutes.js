import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";

import Register from "../pages/Register";

import ProtectedRoute from "../components/ProtectedRoute";

import BookAppointment from "../pages/BookAppointment";

import PatientDashboard from "../pages/PatientDashboard";

import PrescriptionDetails from "../pages/PrescriptionDetails"; 

import MedicalHistory
from "../pages/MedicalHistory";

import DoctorSchedule
from "../pages/DoctorSchedule";

import DoctorConsultation
from "../pages/DoctorConsultation";

import Notifications
from "../pages/Notifications";

import DoctorDashboard from "../pages/DoctorDashboard";

import AdminDashboard from "../pages/AdminDashboard";

import ReceptionistDashboard from "../pages/ReceptionistDashboard";

import NotFound from "../pages/NotFound";
function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
        path="/patient"
        element={
            <ProtectedRoute>

      <PatientDashboard />

            </ProtectedRoute>
        }
        /> 

        <Route
            path="/appointments"
            element={
                <ProtectedRoute>

                <BookAppointment />

                </ProtectedRoute>
            }
            />


            <Route
                path="/prescriptions"
                element={
                    <ProtectedRoute>

                    <PrescriptionDetails />

                    </ProtectedRoute>
                }
                />
        <Route
        path="/doctor"
        element={
            <ProtectedRoute>

            <DoctorDashboard />

            </ProtectedRoute>
        }
        /> 

        <Route
  path="/doctor-schedule"
  element={
    <ProtectedRoute>

      <DoctorSchedule />

    </ProtectedRoute>
  }
/> 

        <Route
  path="/consultations"
  element={
    <ProtectedRoute>

      <DoctorConsultation />

    </ProtectedRoute>
  }
/>
        <Route
        path="/medical-history"
        element={
            <ProtectedRoute>

            <MedicalHistory />

            </ProtectedRoute>
        }
        />

        <Route
        path="/admin"
        element={
            <ProtectedRoute>

            <AdminDashboard />

            </ProtectedRoute>
        }
        />

        <Route
        path="/receptionist"
        element={
            <ProtectedRoute>

            <ReceptionistDashboard />

            </ProtectedRoute>
        }
        />

        <Route
  path="/notifications"
  element={
    <ProtectedRoute>

      <Notifications />

    </ProtectedRoute>
  }
/>
        <Route
        path="*"
        element={<NotFound />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;