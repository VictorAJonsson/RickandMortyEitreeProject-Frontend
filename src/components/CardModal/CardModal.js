import React, { useState, useEffect } from 'react';
import './CardModal.css';
import Loading from '../Loading/Loading';

const CardModal = ({ character_id, handleCloseCard }) => {
  const [cardmodal, setCardModal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/characters/${character_id}`);
        const data = await response.json();
        if (data.success) {
          setCardModal(data.data);
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
    if (!cardmodal) return '';
    switch (status.toLowerCase()) {
      case 'alive':
        return `${cardmodal.name} is a ${cardmodal.gender.toLowerCase()} ${cardmodal.species.toLowerCase()}. ${pronoun} is ${cardmodal.status.toLowerCase()} and well.`;
      case 'dead':
        return `${cardmodal.name} was a ${cardmodal.gender.toLowerCase()} ${cardmodal.species.toLowerCase()}. ${pronoun} is ${cardmodal.status.toLowerCase()}.`;
      default:
        return `${cardmodal.name} is a ${cardmodal.gender.toLowerCase()} ${cardmodal.species.toLowerCase()}. It can’t be told if ${pronoun.toLowerCase()} is alive or dead.`;
    }
  };

  if (!cardmodal) return <Loading />;

  return (
    <div key={cardmodal.id} className="cardChar">
      <div className='cardImg' style={{
        backgroundImage: `url(${cardmodal.image_url})`,
        filter: cardmodal.status === 'Dead' ? 'grayscale(100%)' : 'none',
      }}>
        <div className='stripe'>
          <h4>{cardmodal.name}</h4>
          <h3>{cardmodal.species}</h3>
          <div className='cardstripe'></div>
        </div>
      </div>
      <button onClick={handleCloseCard}>Close</button>
      <h5>ABOUT</h5>
      <h6 className='h7'>{getStatusMessage(cardmodal.status, getPronoun(cardmodal.gender))}</h6>
      <h5>ORIGIN</h5>
      <h6 className='h7'>{cardmodal.origin_name}</h6>
      <h5>LOCATION</h5>
      <h6 className='h7'>{cardmodal.location_name}</h6>
      <div className='backcardstripe'>
        <img src={cardmodal.image_url} alt={cardmodal.name} style={{
          filter: cardmodal.status === 'Dead' ? 'blur(25px) grayscale(100%)' : 'blur(25px)',
        }} />
      </div>
    </div>
  );
};

export default CardModal;
