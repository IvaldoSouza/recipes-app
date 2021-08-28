import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/RecipeProgress.css';
import RecipeDrinkProgressComp from '../components/RecipeDrinkProgressComp';
import LoadingDrink from '../components/LoadingDrink';

function RecipeDrinkProgress() {
  const [recipeProgress, setRecipeProgress] = useState({});
  const [isLoaded, setIsloaded] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [ingredientChecked, setIngredientChecked] = useState([]);

  const history = useHistory();
  const { pathname } = history.location;
  const recipesSelectedId = pathname.split('/')[2];

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipesSelectedId}`)
      .then((response) => response.json())
      .then((data) => setRecipeProgress(data.drinks[0]) || setIsloaded(true));
    if (JSON.parse(localStorage.getItem('inProgressRecipes')) !== null) {
      const saved = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (JSON.stringify(saved).includes('cocktails')) {
        const recipesProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
        const ingredientsSaved = recipesProgress.cocktails[`${recipesSelectedId}`] || [];
        setIngredientChecked(ingredientsSaved);
      }
    }
    if (JSON.parse(localStorage.getItem('favoriteRecipes')) !== null) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const favoriteRecipesFiltered = favoriteRecipes.filter(
        (recipe) => recipe.id === recipesSelectedId,
      );
      setFavorited(favoriteRecipesFiltered.length > 0);
    }
  }, [recipesSelectedId]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('inProgressRecipes')) === null) {
      const inProgress = { meals: {}, cocktails: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    }
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    recipesInProgress.cocktails[`${recipesSelectedId}`] = [...ingredientChecked];
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
  }, [ingredientChecked, recipesSelectedId]);

  function handleChangeCheck({ target }) {
    const { value } = target;
    if (!ingredientChecked.includes(value)) {
      setIngredientChecked((prevState) => ([
        ...prevState,
        value,
      ]));
    } else {
      const filteredIngredientes = ingredientChecked.filter(
        (ingredient) => ingredient !== value,
      );
      setIngredientChecked(filteredIngredientes);
    }
  }

  const propsDrinkProgress = {
    setFavorited,
    handleChangeCheck,
    recipeProgress,
    ingredientChecked,
    favorited,
    recipesSelectedId,
  };

  return (
    <div>
      { isLoaded
        ? <RecipeDrinkProgressComp propsDrinkProgress={ propsDrinkProgress } />
        : <LoadingDrink /> }
    </div>
  );
}

export default RecipeDrinkProgress;
