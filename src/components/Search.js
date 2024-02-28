import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Search() {
    let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.search.value;
    console.log("search term=", searchTerm);
    navigate(`/?query=${searchTerm}`);
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input name="search" type="text" placeholder="Search News" />
    //   <button type="submit">Search</button>
    // </form>
    <form onSubmit={handleSubmit} className="d-flex" role="search">
        <input name="search" className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  );
}
