import React from "react";

function Pagination({ totalPosts, postsPerPage, setCurrentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
           <li key={number} className='page-item'>
            <button onClick={() => setCurrentPage(number)} className='page-link'>
              {number}
            </button>
          </li>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
