import React, { useState, useEffect, useContext } from 'react';
import ExploreAreaCards from './ExploreAreaCards';
import RecipesAppContext from '../context/RecipesAppContext';
import getRecipes from '../services/API';
import '../styles/ExploreArea.css';
import LoadingMeal from './LoadingMeal';

export default function ExploreArea() {
  const { saveMealRecipes, changeHaveRecipes, haveRecipes } = useContext(RecipesAppContext);

  const [arrayArea, setArrayArea] = useState([]);
  const [areaSelected, setAreaSelected] = useState('All');
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((response) => response.json())
      .then((data) => setArrayArea(data.meals));
  }, []);

  function handlerArea({ target }) {
    const { value } = target;
    setAreaSelected(value);
  }

  function renderDropdownArea() {
    return (
      <select
        name="dropdown-area"
        data-testid="explore-by-area-dropdown"
        onChange={ (e) => handlerArea(e) }
      >
        <option
          key={ 0 }
          data-testid="All-option"
          value="All"
        >
          All
        </option>
        { arrayArea.map((area, i) => (
          <option
            key={ i + 1 }
            data-testid={ `${area.strArea}-option` }
            value={ area.strArea }
          >
            { area.strArea }
          </option>
        )) }
      </select>
    );
  }

  function getRecipesByArea() {
    if (areaSelected === 'All') {
      changeHaveRecipes(false);
      getRecipes('', 's', '/comidas', saveMealRecipes);
    } else {
      changeHaveRecipes(false);
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaSelected}`)
        .then((response) => response.json())
        .then((data) => saveMealRecipes(data));
    }
  }
  useEffect(getRecipesByArea, [areaSelected]);

  return (
    <div className="explore-area-section">
      { renderDropdownArea() }
      { !haveRecipes
        ? <LoadingMeal />
        : <ExploreAreaCards /> }
    </div>
  );
}
