import React, { useContext } from 'react';
import MealCard from './MealCard';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/ExploreAreaCards.css';

export default function ExploreAreaCards() {
  const { mealRecipes } = useContext(RecipesAppContext);

  function renderMealCard() {
    const limit = 12;
    return (
      mealRecipes.filter((recipe, i) => i < limit)
        .map((recipe, i) => <MealCard key={ i } recipe={ recipe } i={ i } />)
    );
  }

  return (
    <div className="explore-area-cards-section">
      { renderMealCard() }
    </div>
  );
}
