import React, { useContext, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import Cards from '../components/Cards';
import getRecipes, { getCategoriesFromApi } from '../services/API';
import '../styles/Recipes.css';

export default function Recipes() {
  const {
    mealRecipes,
    drinkRecipes,
    haveRecipes,
    isFilterByCategory,
    changeHaveRecipes,
    saveDrinkRecipes,
    saveMealRecipes,
    saveCategories,
  } = useContext(RecipesAppContext);
  const location = useLocation();
  const history = useHistory();

  function checkOneRecipe() {
    if (isFilterByCategory === false) {
      if (mealRecipes.length === 1 && location.pathname === '/comidas') {
        const id = mealRecipes[0].idMeal;
        const path = `/comidas/${id}`;
        history.push(path);
      } else if (drinkRecipes.length === 1 && location.pathname === '/bebidas') {
        const id = drinkRecipes[0].idDrink;
        const path = `/bebidas/${id}`;
        history.push(path);
      }
    }
  }
  useEffect(checkOneRecipe, [
    isFilterByCategory,
    mealRecipes,
    drinkRecipes,
    history,
    location,
  ]);

  function getCategories() {
    // const path = location.pathname;
    getCategoriesFromApi(location.pathname, saveCategories);
  }
  useEffect(getCategories, [location]);

  function GetRecipesFirstAccess() {
    if (location.pathname === '/bebidas' && drinkRecipes.length === 0) {
      changeHaveRecipes(false);
      getRecipes('', 's', location.pathname, saveDrinkRecipes);
    } else if (location.pathname === '/comidas' && mealRecipes.length === 0) {
      changeHaveRecipes(false);
      getRecipes('', 's', location.pathname, saveMealRecipes);
    }
  }
  useEffect(GetRecipesFirstAccess,
    [
      location, saveDrinkRecipes, drinkRecipes, saveMealRecipes, mealRecipes, haveRecipes, changeHaveRecipes,
    ]);

  return (
    <div className="recipes-section">
      <Cards />
    </div>
  );
}
