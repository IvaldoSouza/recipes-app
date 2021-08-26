import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import DetailsMeals from './pages/DetailsMeals';
import DetailsDrink from './pages/DetailsDrink';
import Perfil from './components/Perfil';
import Explore from './pages/Explore';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFound from './pages/NotFound';
import RecipesDone from './pages/RecipesDone';
import RecipeMealProgress from './pages/RecipeMealProgress';
import RecipeDrinkProgress from './pages/RecipeDrinkProgress';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Recipes } />
      <Route exact path="/Bebidas" component={ Recipes } />
      <Route exact path="/comidas/:id" component={ DetailsMeals } />
      <Route exact path="/bebidas/:id" component={ DetailsDrink } />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ Explore } />
      <Route exact path="/explorar/bebidas" component={ Explore } />
      <Route exact path="/explorar/comidas/ingredientes" component={ Explore } />
      <Route exact path="/explorar/bebidas/ingredientes" component={ Explore } />
      <Route exact path="/explorar/comidas/area" component={ Explore } />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="/comidas/:id/in-progress" component={ RecipeMealProgress } />
      <Route exact path="/bebidas/:id/in-progress" component={ RecipeDrinkProgress } />

      <Route component={ NotFound } />
    </Switch>
  );
}
