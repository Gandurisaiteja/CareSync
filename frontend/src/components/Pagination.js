import React from "react";

import "../styles/table.css";


function Pagination({

currentPage,

totalPages,

setCurrentPage,
}) {

if(totalPages <= 1){
return null;
}

return (

<div className="pagination-container">

<button
className="pagination-btn"
disabled={currentPage === 1}
onClick={() =>
setCurrentPage(
currentPage - 1
)
}
>

Previous

</button>


<div className="pagination-number">

{currentPage}

</div>


<button
className="pagination-btn"
disabled={
currentPage === totalPages
}
onClick={() =>
setCurrentPage(
currentPage + 1
)
}
>

Next

</button>

</div>
);
}

export default Pagination;