import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../styles/RecipesDone.css';

export default function RecipesDone() {
  const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
  const [rpsDone, setRpsDone] = useState(recipesDone);
  const [copyText, setCopyText] = useState('');

  const filterRecipesDone = (type) => {
    if (type === 'all') {
      setRpsDone(recipesDone);
    } else {
      const filterResult = recipesDone.filter((item) => item.type === type);
      setRpsDone(filterResult);
    }
  };

  const handleClickCopy = (recipe) => {
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setCopyText('Link copiado!');
    setInterval(() => setCopyText(''), '2000');
  };

  function renderTags(itemOfMap, indexOfMap) {
    if (itemOfMap.type === 'comida') {
      return (
        itemOfMap.tags.map((itemTag, indexTag) => (
          <p
            data-testid={ `${indexOfMap}-${itemTag}-horizontal-tag` }
            key={ indexTag }
          >
            { itemTag }
          </p>
        ))
      );
    }
  }

  return (
    <div className="recipes-done-section">
      <Header />
      <p>{copyText}</p>
      {/* <header>
        <Link to="/perfil">
          <button type="button">
            <img src={ profileIcon } alt="profileIcon" />
          </button>
        </Link>
        <h1>Receitas Feitas</h1>
        <p>{copyText}</p>
      </header> */}
      <section>
        <button
          className="buttons"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipesDone('all') }
        >
          All
        </button>
        <button
          className="buttons"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterRecipesDone('comida') }
        >
          Food
        </button>
        <button
          className="buttons"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipesDone('bebida') }
        >
          Drink
        </button>
      </section>
      {
        recipesDone ? rpsDone.map((item, index) => {
          if (item.type === 'comida') {
            return (
              <section className="recipes-done">
                <Link to={ `/comidas/${item.id}` }>
                  <img
                    width="200px"
                    data-testid={ `${index}-horizontal-image` }
                    alt="recipe"
                    src={ item.image }
                  />
                </Link>
                <section>
                  <button
                    type="button"
                    onClick={ () => handleClickCopy(item) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      alt="share"
                      src={ shareIcon }
                    />
                  </button>
                  <Link to={ `/comidas/${item.id}` }>
                    <h4 data-testid={ `${index}-horizontal-name` }>{ item.name }</h4>
                  </Link>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${item.area} - ${item.category}` }
                  </p>
                  <b />
                  <p data-testid={ `${index}-horizontal-done-date` }>{ item.doneDate }</p>
                  <b />
                  { renderTags(item, index) }
                </section>
              </section>
            );
          }
          return (
            <section className="recipes-done" key={ index }>
              <Link to={ `/bebidas/${item.id}` }>
                <img
                  width="200px"
                  data-testid={ `${index}-horizontal-image` }
                  alt="recipe"
                  src={ item.image }
                />
              </Link>
              <section>
                <button
                  type="button"
                  onClick={ () => handleClickCopy(item) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    alt="share"
                    src={ shareIcon }
                  />
                </button>
                <Link to={ `/bebidas/${item.id}` }>
                  <h4 data-testid={ `${index}-horizontal-name` }>{ item.name }</h4>
                </Link>
                <p data-testid={ `${index}-horizontal-done-date` }>{ item.doneDate }</p>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { item.alcoholicOrNot }
                </p>
                <b />
              </section>
            </section>
          );
        }) : null
      }
    </div>
  );
}
