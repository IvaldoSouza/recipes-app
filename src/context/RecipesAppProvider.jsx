import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

export default function RecipesAppProvider({ children }) {
  const [mealRecipes, setMealRecipes] = useState([]);
  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const [haveRecipes, setHaveRecipes] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isFilterByCategory, setFilterByCategory] = useState(false);

  function setIsFilterByCategory(value) {
    setFilterByCategory(value);
  }

  function saveCategories(data) {
    setCategories(data);
  }

  function saveMealRecipes(meals) {
    const recipes = meals.meals;
    setMealRecipes(recipes);
    setHaveRecipes(true);
  }

  function saveDrinkRecipes(drinks) {
    const recipesDrinks = drinks.drinks;
    setDrinkRecipes(recipesDrinks);
    setHaveRecipes(true);
  }

  function changeHaveRecipes(bool) {
    setHaveRecipes(bool);
  }

  const context = {
    mealRecipes,
    drinkRecipes,
    categories,
    haveRecipes,
    isFilterByCategory,
    setMealRecipes,
    setDrinkRecipes,
    changeHaveRecipes,
    saveMealRecipes,
    saveDrinkRecipes,
    saveCategories,
    setIsFilterByCategory,
  };

  return (
    <RecipesAppContext.Provider value={ context }>
      { children }
    </RecipesAppContext.Provider>
  );
}

RecipesAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
