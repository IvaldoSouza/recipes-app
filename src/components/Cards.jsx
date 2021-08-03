import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import DrinkCard from './DrinkCard';
import MealCard from './MealCard';
import Header from './Header';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/Cards.css';

export default function Cards() {
  const { haveRecipes, mealRecipes, drinkRecipes } = useContext(RecipesAppContext);
  const location = useLocation();
  const limit = 12;

  function renderRecipes() {
    if (haveRecipes && location.pathname === '/comidas') {
      const recipes = mealRecipes.filter((recipe, index) => index < limit);
      return (
        recipes.map((recipe, index) => (
          <MealCard key={ index } recipe={ recipe } i={ index } />))
      );
    }
    if (haveRecipes && location.pathname === '/bebidas') {
      const recipes = drinkRecipes.filter((recipe, index) => index < limit);
      return (
        recipes.map((recipe, index) => (
          <DrinkCard key={ index } recipe={ recipe } i={ index } />))
      );
    }
  }
  return (
    <div className="cards-section">
      <Header />
      { haveRecipes
        ? renderRecipes()
        : <h3>Loading...</h3> }
    </div>
  );
}