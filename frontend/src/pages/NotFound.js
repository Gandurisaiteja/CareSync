import React from "react";

import "../styles/notfound.css";

import { Link } from "react-router-dom";


function NotFound() {

return (

<div className="notfound-page">

<div className="notfound-card">

<h1>
404
</h1>

<h2>
Page Not Found
</h2>

<p>
The page you are looking for does not exist.
</p>

<button
className="back-btn"
onClick={() =>
window.history.back()
}
>

Go Back

</button>
</div>

</div>
);
}

export default NotFound;