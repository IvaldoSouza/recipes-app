import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/RecipeMealProgress.css';
import RecipeMealProgressComp from '../components/RecipeMealProgressComp';
import LoadingMeal from '../components/LoadingMeal';

function RecipeMealProgress() {
  const [recipeProgress, setRecipeProgress] = useState({});
  const [isLoaded, setIsloaded] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [ingredientChecked, setIngredientChecked] = useState([]);

  const history = useHistory();
  const { pathname } = history.location;
  const recipesSelectedId = pathname.split('/')[2];

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipesSelectedId}`)
      .then((response) => response.json())
      .then((data) => setRecipeProgress(data.meals[0]) || setIsloaded(true));
    if (JSON.parse(localStorage.getItem('inProgressRecipes')) !== null) {
      const saved = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (JSON.stringify(saved).includes('meals')) {
        const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
        const ingredientsSaved = recipesInProgress.meals[`${recipesSelectedId}`] || [];
        console.log(ingredientsSaved);
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
    recipesInProgress.meals[`${recipesSelectedId}`] = [...ingredientChecked];
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

  const propsMealProgress = {
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
        ? <RecipeMealProgressComp propsMealProgress={ propsMealProgress } />
        : <LoadingMeal /> }
    </div>
  );
}

export default RecipeMealProgress;
