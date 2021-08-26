import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ExploreInitial.css';

export default function ExploreInitial() {
  return (
    <div className="explore-section">
      <Link to="/explorar/comidas">
        <h2 data-testid="explore-food">Explorar Comidas</h2>
      </Link>
      <Link to="/explorar/bebidas">
        <h2 data-testid="explore-drinks">Explorar Bebidas</h2>
      </Link>
    </div>
  );
}
