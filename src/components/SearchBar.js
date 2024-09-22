import { useState } from "react";
import { useHistory } from "react-router-dom";
import React from 'react'

// styles
import "./SearchBar.css";  // Import the CSS styles for the search bar

export default function Searchbar() {
  // State to store the search term entered by the user
  const [term, setTerm] = useState('');

  // useHistory hook gives access to the history object for navigation
  const history = useHistory();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission (which would refresh the page)
    
    // Programmatically navigate to the search results page with the query term
    // The query parameter is passed via URL, e.g., /search?q=searchTerm
    history.push(`/search?q=${term}`);
  };

  return (
    <div className="searchbar">
      {/* Form to handle the search term input */}
      <form onSubmit={handleSubmit}>

        {/* Label for the search input field */}
        <label htmlFor="search">Search:</label>

        {/* Input field for the search term */}
        <input
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value)}  // Update the search term state when the user types
          required  // Make the input field required (can't submit empty form)
        />
      </form>
    </div>
  );
}
