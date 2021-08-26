import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import * as api from '../services/API';
import '../styles/Categories.css';

export default function Categories() {
  const {
    categories,
    setIsFilterByCategory,
    saveMealRecipes,
    saveDrinkRecipes,
  } = useContext(RecipesAppContext);

  const [categoryClicked, setCategoryClicked] = useState(false);

  const limit = 5;
  const firstFiveCategories = categories.filter((item, index) => index < limit);
  const location = useLocation();

  function filterRecipiesByCategory({ target }) {
    setIsFilterByCategory(true);
    const { value } = target;
    const path = location.pathname;
    let callback;
    if (categoryClicked === value && path === '/comidas') {
      setCategoryClicked('');
      api.getRecipesFromMealAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=', saveMealRecipes);
    } else if (categoryClicked === value && path === '/bebidas') {
      setCategoryClicked('');
      api.getRecipesFromCocktailAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', saveDrinkRecipes);
    } else {
      setCategoryClicked(value);
      if (path === '/comidas') {
        callback = saveMealRecipes;
      } else {
        callback = saveDrinkRecipes;
      }
      api.getRecipiesByCategories(value, path, callback);
    }
  }

  return (
    <section className="categories-section">
      <button
        type="button"
        value={ categoryClicked }
        onClick={ (e) => filterRecipiesByCategory(e) }
        data-testid="All-category-filter"
      >
        ALL
      </button>
      { firstFiveCategories.map((category, index) => (
        <button
          type="button"
          key={ index }
          value={ category.strCategory }
          onClick={ (e) => filterRecipiesByCategory(e) }
          data-testid={ `${category.strCategory}-category-filter` }
        >
          { category.strCategory }
        </button>
      ))}
    </section>
  );
}
