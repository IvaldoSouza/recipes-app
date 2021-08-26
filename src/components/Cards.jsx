import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import DrinkCard from './DrinkCard';
import MealCard from './MealCard';
import Header from './Header';
import RecipesAppContext from '../context/RecipesAppContext';
import MenuInferior from './MenuInferior';
import LoadingMeal from './LoadingMeal';
import '../styles/Cards.css';
import LoadingDrink from './LoadingDrink';

export default function Cards() {
  const { haveRecipes, mealRecipes, drinkRecipes } = useContext(RecipesAppContext);
  const location = useLocation();
  const limit = 12;

  function renderRecipes() {
    if (haveRecipes && location.pathname === '/comidas') {
      const recipes = mealRecipes.filter((recipe, index) => index < limit);
      return (
        <div className="cards">
          {recipes.map((recipe, index) => (
            <MealCard key={ index } recipe={ recipe } i={ index } />))}
        </div>
      );
    }
    if (haveRecipes && location.pathname === '/bebidas') {
      const recipes = drinkRecipes.filter((recipe, index) => index < limit);
      return (
        <div className="cards">
          {recipes.map((recipe, index) => (
            <DrinkCard key={ index } recipe={ recipe } i={ index } />))}
        </div>
      );
    }
  }

  function renderLoading() {
    if (location.pathname === '/comidas') return <LoadingMeal />;
    if (location.pathname === '/bebidas') return <LoadingDrink />;
  }

  return (
    <div className="cards-section">
      <Header />
      { haveRecipes
        ? renderRecipes()
        : renderLoading() }
      <MenuInferior />
    </div>
  );
}
