// src/components/Body/Body.js
import React from 'react';
import './Body.css';
import CharList from '../CharList/CharList';
import Pagination from '../Pagination/Pagination';


const Body = ({ characters, totalPages, onPageChange }) => {

  return (
    <div className='Container'>
      <CharList characters={characters} />
      <Pagination totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
};

export default Body;
