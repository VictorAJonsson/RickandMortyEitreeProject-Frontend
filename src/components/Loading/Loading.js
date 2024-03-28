import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
  <div className="loading">
    <div className='loadingimg'
      style={{ backgroundImage: "url('./images/Loading-img.jpeg')" }}>
    </div>
    <h2>Loading</h2>
  </div>
  );
};
export default Loading;