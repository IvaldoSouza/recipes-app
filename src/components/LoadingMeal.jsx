import React from 'react';
import panela from '../images/panela.gif';
import '../styles/LoadingMeal.css';

export default function LoadingMeal() {
  return (
    <div className="loading-meal">
      <img src={ panela } alt="gif" />
    </div>
  );
}
