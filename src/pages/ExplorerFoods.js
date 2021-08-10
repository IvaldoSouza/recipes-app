import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

export default function ExplorerFoods() {
  const { getRandomFood } = useContext(MyContext);
  const [id, setId] = useState('');

  useEffect(() => {
    const getId = async () => {
      setId(await getRandomFood(id));
    };
    getId();
  });

  return (
    <main>
      <Header title="Explorar Comidas" disable />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      <Link to={ `/comidas/${id}` }>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </main>
  );
}