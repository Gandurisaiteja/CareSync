import React from "react";

import "../styles/navbar.css";


function Navbar({
setSidebarOpen,
}) {

const user =
JSON.parse(
localStorage.getItem("user")
);

const handleLogout =
() => {

localStorage.clear();

window.location.href = "/";
};

return (

<div className="navbar">

<div className="navbar-left">

<button
className="navbar-menu-btn"
onClick={() =>
setSidebarOpen(
prev => !prev
)
}
>

<i className="fa-solid fa-bars"></i>

</button>

<h2 className="navbar-logo">

<i className="fa-solid fa-heart-pulse"></i>

CareSync

</h2>

</div>


<div className="navbar-right">

<div className="navbar-profile">

<div className="navbar-avatar">

<i className="fa-solid fa-user"></i>

</div>

<div className="navbar-user-info">

<h4>
{user?.name}
</h4>

<p>
{user?.role}
</p>

</div>

</div>


<button
className="navbar-logout-btn"
onClick={handleLogout}
>

<i className="fa-solid fa-right-from-bracket"></i>

Logout

</button>

</div>

</div>
);
}

export default Navbar;