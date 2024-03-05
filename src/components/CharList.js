// src/components/CharList.js
import React, { useState } from 'react';
import './CharList.css';

const CharList = ({ characters, totalPages, onPageChange }) => {
  const [charcard, setcharcard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCardChar, setShowCardChar] = useState(false);
  const pagesToShow = 5;

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    onPageChange(page);

  };

  const getPageNumbers = () => {
    const halfPages = Math.floor(pagesToShow / 2);
    let startPage = Math.max(1, currentPage - halfPages);
    let endPage = Math.min(totalPages, startPage + pagesToShow - 1);
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const fetchId = async (character_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/characters/${character_id}`);
      const data = await response.json();
      if (data.success) {
        setcharcard(data.data);
        setShowCardChar(true);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error in request to /api/characters/' + character_id, error);
    }
  };
  
  return (
    <div className='Container'>

      {showCardChar &&
        <div key={charcard.id} className="cardChar">
          <div className='cardImg' style={{
            backgroundImage: `url(${charcard.image_url})`,
            filter: charcard.status === 'Dead' ? 'grayscale(100%)' : 'none',
          }}>
            <div className='stripe'>
              <h4>{charcard.name}</h4>
              <h3>{charcard.species}</h3>
              <div className='cardstripe'></div>
            </div>
          </div>
          <button onClick={() => setShowCardChar(false)}>Close</button>
          <h5>ABOUT</h5>
          <h6>{charcard.name} is a {charcard.gender} {charcard.species}. He is {charcard.status}.</h6>
          <h5>ORIGIN</h5>
          <h7>{charcard.origin_name}</h7>
          <h5>LOCATION</h5>
          <h7>{charcard.location_name}</h7>
          <div className='backcardstripe'>
            <img src={charcard.image_url} alt={charcard.name} style={{
              filter: charcard.status === 'Dead' ? 'blur(25px) grayscale(100%)' : 'blur(25px)',
            }} />
          </div>
        </div>
      }

      <div className="characterlist">
        {characters.map((character) => (
          <div className='gridarea'>
            <div key={character.id} className="backgroundimg"
              style={{
                backgroundImage: `url(${character.image_url})`,
                filter: character.status === 'Dead' ? 'grayscale(100%)' : 'none',
              }}>
              <div className='charactercards' onClick={() => fetchId(character.id)}>
                <h1>{character.name}</h1>
                <h3>{character.species}</h3>
                <div className='mattestripe'>
                  <img src={character.image_url} alt={character.name} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          <svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 1L1 10.5L10 20" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" />
          </svg>
        </button>
        <span className='pagesnumebers'>
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              className={pageNumber === currentPage ? 'active' : ''}>
              {pageNumber}
            </button>
          ))}
        </span>
        <button className='next' onClick={nextPage} disabled={currentPage === totalPages}>
          <svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.999999 20L10 10.5L1 0.999998" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" />
          </svg>
        </button>
      </div>

    </div>
  );
};

export default CharList;