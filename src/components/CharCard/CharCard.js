import React, { useState, useEffect } from 'react';
import './CharCard.css';
import Loading from '../Loading/Loading';

const CharCard = ({ character_id, handleCloseCard }) => {
  const [charcard, setCharCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/characters/${character_id}`);
        const data = await response.json();
        if (data.success) {
          setCharCard(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error in request to /api/characters/' + character_id, error);
      }
    };

    fetchData();
  }, [character_id]);

  const getPronoun = (gender) => {
    switch (gender) {
      case 'Male':
        return 'He';
      case 'Female':
        return 'She';
      default:
        return 'They';
    }
  };

  const getStatusMessage = (status, pronoun) => {
    if (!charcard) return '';
    switch (status.toLowerCase()) {
      case 'alive':
        return `${charcard.name} is a ${charcard.gender.toLowerCase()} ${charcard.species.toLowerCase()}. ${pronoun} is ${charcard.status.toLowerCase()} and well.`;
      case 'dead':
        return `${charcard.name} was a ${charcard.gender.toLowerCase()} ${charcard.species.toLowerCase()}. ${pronoun} is ${charcard.status.toLowerCase()}.`;
      default:
        return `${charcard.name} is a ${charcard.gender.toLowerCase()} ${charcard.species.toLowerCase()}. It can’t be told if ${pronoun.toLowerCase()} is alive or dead.`;
    }
  };

  if (!charcard) return <Loading/>;

  return (
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
      <button onClick={handleCloseCard}>Close</button>
      <h5>ABOUT</h5>
      <h6 className='h7'>{getStatusMessage(charcard.status, getPronoun(charcard.gender))}</h6>
      <h5>ORIGIN</h5>
      <h6 className='h7'>{charcard.origin_name}</h6>
      <h5>LOCATION</h5>
      <h6 className='h7'>{charcard.location_name}</h6>
      <div className='backcardstripe'>
        <img src={charcard.image_url} alt={charcard.name} style={{
          filter: charcard.status === 'Dead' ? 'blur(25px) grayscale(100%)' : 'blur(25px)',
        }} />
      </div>
    </div>
  );
};

export default CharCard;
