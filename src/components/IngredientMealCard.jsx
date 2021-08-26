import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/IngredientMealCard.css';

export default function IngredientMealCard({ ingredient, i }) {
  const { saveMealRecipes } = useContext(RecipesAppContext);

  const history = useHistory();

  function getRecipesByIngredient() {
    const time = 2000;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.strIngredient}`)
      .then((response) => response.json())
      .then((data) => saveMealRecipes(data));
    setTimeout(() => {
      history.push('/comidas');
    }, time);
  }

  return (
    <div className="ingredient-meal-card">
      <button
        type="button"
        onClick={ () => getRecipesByIngredient() }
        data-testid={ `${i}-ingredient-card` }
      >
        <img
          src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
          alt={ ingredient.strIngredient }
          data-testid={ `${i}-card-img` }
        />
        <p data-testid={ `${i}-card-name` }>{ ingredient.strIngredient }</p>
      </button>
    </div>
  );
}

IngredientMealCard.propTypes = {
  ingredient: PropTypes.objectOf(PropTypes.string).isRequired,
  i: PropTypes.number.isRequired,
};
