// src/App.js
import React, { useState } from 'react';
import './App.css';
import CharList from './components/CharList';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [showCharList, setShowCharList] = useState(false);
  const [showCharLoading, setShowCharLoading] = useState(false);

  const fetchCharacters = async (page = 1, searchTerm) => {
    try {
      setShowCharLoading(true);
      const response = await fetch(`http://localhost:5000/api/characters?partial_name=${searchTerm}&page=${page}`);
      const data = await response.json();
      if (data.success) {
        setCharacters(data.data.character_list);
        setTotalPages(data.data.total_pages);
        setShowCharList(true);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setShowCharLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    fetchCharacters(newPage, searchTerm);
  };

  return (
    <div className="App">
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
      {showCharLoading &&
        <div className="loading">
          <div className='loadingimg'
            style={{ backgroundImage: "url('./images/Loading-img.jpeg')" }}>
          </div>
          <h2>Loading</h2>
        </div>}
      {showCharList && <CharList characters={characters} totalPages={totalPages} onPageChange={handlePageChange} />}
    </div>
  );
}

export default App;
