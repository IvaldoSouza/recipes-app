import React, { useState, useEffect, useContext } from 'react';
import ExploreAreaCards from './ExploreAreaCards';
import RecipesAppContext from '../context/RecipesAppContext';
import getRecipes from '../services/API';
import '../styles/ExploreArea.css';

export default function ExploreArea() {
  const { saveMealRecipes } = useContext(RecipesAppContext);

  const [arrayArea, setArrayArea] = useState([]);
  const [areaSelected, setAreaSelected] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    if (areaSelected === 'All') {
      getRecipes('', 's', '/comidas', saveMealRecipes);
      setIsLoading(false);
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaSelected}`)
        .then((response) => response.json())
        .then((data) => saveMealRecipes(data) || setIsLoading(false));
    }
  }
  useEffect(getRecipesByArea, [areaSelected, saveMealRecipes, setIsLoading]);

  return (
    <div className="explore-area-section">
      { renderDropdownArea() }
      { isLoading
        ? <h3>Loading...</h3>
        : <ExploreAreaCards /> }
    </div>
  );
}
