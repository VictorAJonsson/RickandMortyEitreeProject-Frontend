// components/Head.js
import React from 'react';
import './Head.css';


const Head = ({ searchTerm, setSearchTerm, fetchCharacters }) => {
  return (
    <div className='Elements'>
      <img className='titleimg' src="./images/Title-img.png" alt="Rick and Morty" />
      <div className="search-container">
        <input
          type="text"
          placeholder="Search characters"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => fetchCharacters(1, searchTerm)}>Search</button>
      </div>
    </div>
  );
}

export default Head;
