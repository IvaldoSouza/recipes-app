import React from 'react';
import '../styles/LoadingDrink.css';
import bebida from '../images/bebida.gif';

export default function LoadingDrink() {
  return (
    <div className="loading-drink">
      <img src={ bebida } alt="gif" />
    </div>
  );
}
