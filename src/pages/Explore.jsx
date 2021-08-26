import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import ExploreFoodAndDrink from '../components/ExploreFoodAndDrink';
import ExploreInitial from '../components/ExploreInitial';
import ExploreCards from '../components/ExploreCards';
import ExploreArea from '../components/ExploreArea';
import MenuInferior from '../components/MenuInferior';

export default function Explore() {
  const location = useLocation().pathname;

  return (
    <section className="explore-section">
      <Header />
      {(location === '/explorar') && <ExploreInitial />}
      { location === '/explorar/bebidas' && <ExploreFoodAndDrink />}
      { location === '/explorar/comidas' && <ExploreFoodAndDrink />}
      { location === '/explorar/comidas/ingredientes' && <ExploreCards />}
      { location === '/explorar/bebidas/ingredientes' && <ExploreCards />}
      { location === '/explorar/comidas/area' && <ExploreArea />}
      <MenuInferior />
    </section>
  );
}
