import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function DetailsDrinkComp({ propsDrink }) {
  const {
    recipesDetails,
    handleClickCopy,
    handleClickFavorites,
    favorite,
    copyText,
    getIngredients,
    recipesRecommendation,
    buttonHiddenClass,
    inProgress,
    handleClickRecipesProgress,
  } = propsDrink;

  return (
    <div className="containerDetailsFood">
      <img
        className="recipes-img"
        data-testid="recipe-photo"
        alt="recipes-food"
        src={ recipesDetails.strDrinkThumb }
      />
      <div data-testid="recipe-title" className="h2teste">
        <h2>{ recipesDetails.strDrink }</h2>
        <div className="buttons-share-favorite">
          <button
            data-testid="share-btn"
            type="button"
            onClick={ handleClickCopy }
          >
            <img src={ shareIcon } alt="share" />
          </button>
          <button
            type="button"
            className="buttons-heart-favorite"
            onClick={ handleClickFavorites }
          >
            <img
              data-testid="favorite-btn"
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
              alt="favorite"
            />
          </button>
        </div>
      </div>
      <p>{copyText}</p>
      <p data-testid="recipe-category">{ recipesDetails.strAlcoholic }</p>

      <h4>Ingredients</h4>
      <div>
        { getIngredients(recipesDetails) }
      </div>
      <h4>Instructions</h4>
      <p data-testid="instructions">{ recipesDetails.strInstructions }</p>
      <div>
        <h4>Recomendadas</h4>
      </div>
      <section className="recomend-container">
        {
          recipesRecommendation && recipesRecommendation.length && recipesRecommendation
            .filter((_, indexFilter) => indexFilter < '6')
            .map((meals, index) => (
              <div
                data-testid={ `${index}-recomendation-card` }
                key={ index }
                className=""
              >
                <h4
                  data-testid={ `${index}-recomendation-title` }
                >
                  { meals.strMeal }
                </h4>
                <Link
                  // onClick={ () => setRecipeId(meals.idMeal) }
                  to={ `/comidas/${meals.idMeal}` }
                >
                  <img
                    className="recomend-img"
                    data-testid={ `${index}-card-img` }
                    src={ meals.strMealThumb }
                    alt={ meals.strMeal }
                  />
                </Link>
              </div>
            ))
        }
      </section>
      <button
        className={ buttonHiddenClass }
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => handleClickRecipesProgress() }
      >
        { inProgress ? 'Continuar Receita' : 'Iniciar Receita' }
      </button>
    </div>
  );
}

DetailsDrinkComp.propTypes = {
  propsDrink: PropTypes.shape({
    recipesDetails: PropTypes.objectOf(PropTypes.string),
    handleClickCopy: PropTypes.func,
    handleClickFavorites: PropTypes.func,
    favorite: PropTypes.bool,
    copyText: PropTypes.string,
    getIngredients: PropTypes.func,
    recipesRecommendation: PropTypes.arrayOf(PropTypes.object),
    setRecipeId: PropTypes.func,
    buttonHiddenClass: PropTypes.string,
    inProgress: PropTypes.bool,
    recipesDrinkSelectedId: PropTypes.string,
    handleClickRecipesProgress: PropTypes.func,
  }).isRequired,
};
