// components/CharList/CharList.js
import React, { useState } from 'react';
import './CharList.css';
import CharCard from '../CharCard/CharCard';

const CharList = ({ characters }) => {
  const [showCardChar, setShowCardChar] = useState(false);
  const [character_id, setCharacterId] = useState(1);
  
  const handleCloseCard = () => {
    setShowCardChar(false);
  };

  return (
    <>
      {showCardChar && <CharCard showCardChar={showCardChar} character_id={character_id} handleCloseCard={handleCloseCard} />}

      <div className="characterlist">
        {characters.map((character) => (
          <div key={character.id} className='gridarea'>
            <div className="backgroundimg"
              style={{
                backgroundImage: `url(${character.image_url})`,
                filter: character.status === 'Dead' ? 'grayscale(100%)' : 'none',
              }}>
              <div className='charactercards' onClick={() => { setShowCardChar(true); setCharacterId(character.id); }}>
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
    </>
  );
};


export default CharList;
