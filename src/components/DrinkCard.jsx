import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/DrinkCard.css';

export default function DrinkCard({ recipe, i }) {
  const location = useLocation();
  return (
    <div className="drink-card" data-testid={ `${i}-recipe-card` }>
      <Link to={ `${location.pathname}/${recipe.idDrink}` }>
        <img
          src={ recipe.strDrinkThumb }
          alt={ recipe.strDrink }
          data-testid={ `${i}-card-img` }
        />
        <p data-testid={ `${i}-card-name` }>{ recipe.strDrink }</p>
      </Link>
    </div>
  );
}

DrinkCard.propTypes = {
  recipe: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
  i: PropTypes.number.isRequired,
};
