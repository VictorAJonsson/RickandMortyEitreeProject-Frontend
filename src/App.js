// src/App.js
import React, { useState } from 'react';
import './App.css';
import Head from './components/Head/Head';
import Loading from './components/Loading/Loading';
import Body from './components/Body/Body';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [showBody, setShowBody] = useState(false);
  const [showCharLoading, setShowCharLoading] = useState(false);

  const fetchCharacters = async (page = 1, searchTerm) => {
    try {
      setShowCharLoading(true);
      const response = await fetch(`http://localhost:5000/api/characters?partial_name=${searchTerm}&page=${page}`);
      const data = await response.json();
      if (data.success) {
        setCharacters(data.data.character_list);
        setTotalPages(data.data.total_pages);
        setShowBody(true);
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

      <Head searchTerm={searchTerm} setSearchTerm={setSearchTerm} fetchCharacters={fetchCharacters} />

      {showCharLoading && <Loading />}

      {showBody && <Body characters={characters} totalPages={totalPages} onPageChange={handlePageChange} />}

    </div>
  );
}

export default App;
