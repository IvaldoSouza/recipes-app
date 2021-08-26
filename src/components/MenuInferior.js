import React from 'react';
import { Link } from 'react-router-dom';
import drink from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/MenuInferior.css';

export default function MenuInferior() {
  return (
    <div className="menu-bottom">
      <footer className="menu-bottom-imagens" data-testid="footer">
        <Link to="/bebidas">
          <img data-testid="drinks-bottom-btn" src={ drink } alt="Drink Icon" />
        </Link>
        <Link to="/explorar">
          <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="Drink Icon" />
        </Link>
        <Link to="/comidas">
          <img data-testid="food-bottom-btn" src={ mealIcon } alt="Drink Icon" />
        </Link>
      </footer>
    </div>
  );
}
