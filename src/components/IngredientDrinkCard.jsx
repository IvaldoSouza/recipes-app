import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/IngredientDrinkCard.css';

export default function IngredientDrinkCard({ ingredient, i }) {
  const { saveDrinkRecipes } = useContext(RecipesAppContext);

  const history = useHistory();

  function getRecipesByIngredient() {
    const time = 2000;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient.strIngredient1}`)
      .then((response) => response.json())
      .then((data) => saveDrinkRecipes(data));
    setTimeout(() => {
      history.push('/bebidas');
    }, time);
  }

  return (
    <div className="ingredient-drink-card">
      <button
        type="button"
        onClick={ () => getRecipesByIngredient() }
        data-testid={ `${i}-ingredient-card` }
      >
        <img
          src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
          alt={ ingredient.strIngredient1 }
          data-testid={ `${i}-card-img` }
        />
        <p data-testid={ `${i}-card-name` }>{ ingredient.strIngredient1 }</p>
      </button>
    </div>
  );
}

IngredientDrinkCard.propTypes = {
  ingredient: PropTypes.objectOf(PropTypes.string).isRequired,
  i: PropTypes.number.isRequired,
};
