import React from 'react';
import emptyDish from '../images/emptyDish.png';
import '../styles/NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-section">
      <img src={ emptyDish } alt="empty dish" />
      <h2>Not Found</h2>
    </div>
  );
}
