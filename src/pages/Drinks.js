import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import RecipeCards from '../components/RecipeCards';
import Footer from '../components/Footer';
import RecipeAppContext from '../context/RecipeAppContext';

function Drinks() {
  const { setDrinksList } = useContext(RecipeAppContext);

  useEffect(() => {
    const drinkEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetch(drinkEndpoint)
      .then((response) => response.json())
      .then((results) => setDrinksList(results.drinks));
  }, []);

  return (
    <div>
      <Header title="Bebidas" icon drinks />
      <RecipeCards />
      <Footer />
    </div>
  );
}

export default Drinks;
