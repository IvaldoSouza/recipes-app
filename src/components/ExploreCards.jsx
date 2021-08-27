import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import IngredientMealCard from './IngredientMealCard';
import IngredientDrinkCard from './IngredientDrinkCard';
import '../styles/ExploreCards.css';

export default function ExploreCards() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation().pathname;

  const limit = 12;

  const food = '/explorar/comidas/ingredientes';
  const drink = '/explorar/bebidas/ingredientes';

  useEffect(() => {
    setIsLoading(true);
    const URL_MEAL_INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const URL_COCKTAIL_INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    if (location === food) {
      fetch(URL_MEAL_INGREDIENTS)
        .then((response) => response.json())
        .then((data) => setIngredients(data.meals));
      setIsLoading(false);
    } else if (location === drink) {
      fetch(URL_COCKTAIL_INGREDIENTS)
        .then((response) => response.json())
        .then((data) => setIngredients(data.drinks));
      setIsLoading(false);
    }
  }, [location]);

  return (
    <div className="explore-cards-section">
      { isLoading && <h3>Loading...</h3>}
      { !isLoading && location === food
      && ingredients.filter((ingredient, i) => i < limit)
        .map((ingredient, i) => (
          <IngredientMealCard key={ i } ingredient={ ingredient } i={ i } />)) }
      { !isLoading && location === drink
        && ingredients.filter((ingredient, i) => i < limit)
          .map((ingredient, i) => (
            <IngredientDrinkCard key={ i } ingredient={ ingredient } i={ i } />)) }
    </div>
  );
}
