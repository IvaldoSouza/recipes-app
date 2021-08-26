import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function DetailsMealsComp({ propsDrink }) {
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

  function embedVideo() {
    const id = `${recipesDetails.strYoutube}`;
    const array = id.split('=');
    return `https://www.youtube.com/embed/${array[1]}`;
  }

  return (
    <div className="containerDetailsFood">
      <img
        className="recipes-img"
        data-testid="recipe-photo"
        alt="recipes-food"
        src={ recipesDetails.strMealThumb }
      />
      <div data-testid="recipe-title" className="h2teste">
        <h2>{ recipesDetails.strMeal }</h2>
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
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
              data-testid="favorite-btn"
              alt="favorite"
            />
          </button>
        </div>
      </div>
      <p>{ copyText }</p>
      <p data-testid="recipe-category">{ recipesDetails.strCategory }</p>

      <h4>Ingredients</h4>
      <div>
        {getIngredients(recipesDetails)}
      </div>
      <h4>Instructions</h4>
      <p data-testid="instructions">{ recipesDetails.strInstructions }</p>
      <iframe
        title={ recipesDetails.strMeal }
        className="video"
        data-testid="video"
        src={ embedVideo() }
        frameBorder="0"
      />
      <div>
        <h4>Recomendadas</h4>
      </div>
      <section className="recomend-container">
        {
          recipesRecommendation && recipesRecommendation.length && recipesRecommendation
            .filter((_, indexFilter) => indexFilter < '6')
            .map((drinks, index) => (
              <div
                data-testid={ `${index}-recomendation-card` }
                key={ index }
              >
                <p>{drinks.strAlcoholic}</p>
                <h4
                  data-testid={ `${index}-recomendation-title` }
                >
                  {drinks.strDrink}
                </h4>
                <Link
                  // onClick={ () => setDrinkRecipeId(drinks.idDrink) }
                  to={ `/bebidas/${drinks.idDrink}` }
                >
                  <img
                    className="recomend-img"
                    data-testid={ `${index}-card-img` }
                    src={ drinks.strDrinkThumb }
                    alt={ drinks.strDrink }
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

DetailsMealsComp.propTypes = {
  propsDrink: PropTypes.shape({
    recipesDetails: PropTypes.objectOf(PropTypes.string),
    handleClickCopy: PropTypes.func,
    handleClickFavorites: PropTypes.func,
    favorite: PropTypes.bool,
    copyText: PropTypes.string,
    getIngredients: PropTypes.func,
    handleClickRecipesProgress: PropTypes.func,
    recipesRecommendation: PropTypes.arrayOf(PropTypes.object),
    setRecipeId: PropTypes.func,
    buttonHiddenClass: PropTypes.string,
    inProgress: PropTypes.bool,
    setDrinkRecipeId: PropTypes.string,
    recipesSelectedId: PropTypes.string,
  }).isRequired,
};
