import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import '../styles/ExploreFoodAndDrink.css';

export default function ExploreFoodAndDrink() {
  const location = useLocation().pathname;
  const history = useHistory();

  function getRamdonRoute() {
    const URL_MEAL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const path = `/${location.split('/')[2]}`;
    if (path === '/comidas') {
      fetch(URL_MEAL)
        .then((response) => response.json())
        .then((data) => history.push(`${path}/${data.meals[0].idMeal}`));
    } else if (path === '/bebidas') {
      fetch(URL_DRINK)
        .then((response) => response.json())
        .then((data) => history.push(`${path}/${data.drinks[0].idDrink}`));
    }
  }
  return (
    <div className="explore-buttons">
      <button
        type="button"
        onClick={ () => history.push(`${location}/ingredientes`) }
        data-testid="explore-by-ingredient"
      >
        <h3>Por Ingredientes</h3>
      </button>
      {
        location === '/explorar/comidas'
          && (
            <button
              type="button"
              onClick={ () => history.push(`${location}/area`) }
              data-testid="explore-by-area"
            >
              <h3>Por Local de Origem</h3>
            </button>
          )
      }
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => getRamdonRoute() }
      >
        <h3>Me Surpreenda!</h3>
      </button>

    </div>

  );
}
