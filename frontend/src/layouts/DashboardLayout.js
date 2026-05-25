import React,{
useState,
} from "react";

import Navbar from "../components/Navbar";

import Sidebar from "../components/Sidebar";

import "../styles/dashboard.css";
import "../styles/dashboardlayout.css";

function DashboardLayout({
children,
}) {

const [sidebarOpen,
setSidebarOpen] =
useState(false);


return (
<div className="dashboard-layout">

<Sidebar
sidebarOpen={sidebarOpen}
setSidebarOpen={setSidebarOpen}
/>

<div className="dashboard-main">

<Navbar
setSidebarOpen={setSidebarOpen}
/>

<div className="dashboard-content">

{children}

</div>

</div>

</div>
);
}

export default DashboardLayout;