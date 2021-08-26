import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import getRecipes from '../services/API';
import '../styles/SearchBar.css';
import RecipesAppContext from '../context/RecipesAppContext';

export default function SearchBar() {
  const {
    changeHaveRecipes,
    saveMealRecipes,
    saveDrinkRecipes,
    setIsFilterByCategory,
  } = useContext(RecipesAppContext);

  const [textInputValue, setTextInputValue] = useState('');
  const [radioInputValue, setRadioInputValue] = useState('');
  const location = useLocation();

  function handlerInputText({ target }) {
    const { value } = target;
    setTextInputValue(value);
    setIsFilterByCategory(false);
  }

  function handlerInputRadio({ target }) {
    const { value } = target;
    setRadioInputValue(value);
    setIsFilterByCategory(false);
  }

  function updateDataToSearch() {
    setIsFilterByCategory(false);
    if (radioInputValue === 'f' && textInputValue.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }

    changeHaveRecipes(false);
    const path = location.pathname;
    let callback;
    if (path === '/comidas') {
      callback = saveMealRecipes;
    } else {
      callback = saveDrinkRecipes;
    }
    getRecipes(textInputValue, radioInputValue, path, callback);
  }

  return (
    <section className="recipes-filter-section">

      <nav className="search-bar-nav">
        <input
          className="input-text-search-bar"
          type="text"
          data-testid="search-input"
          onChange={ (e) => handlerInputText(e) }
        />
        <div className="search-radio-div">
          <label className="search-radio" htmlFor="ingredient-search-radio">
            Ingrediente
            <input
              type="radio"
              className="search-radio"
              name="search-radio"
              data-testid="ingredient-search-radio"
              id="ingredient-search-radio"
              onClick={ (e) => handlerInputRadio(e) }
              value="i"
            />
          </label>
          <label className="search-radio" htmlFor="name-search-radio">
            Nome
            <input
              type="radio"
              className="search-radio"
              name="search-radio"
              data-testid="name-search-radio"
              id="name-search-radio"
              onClick={ (e) => handlerInputRadio(e) }
              value="s"
            />
          </label>
          <label className="search-radio" htmlFor="first-letter-search-radio">
            Primeira letra
            <input
              type="radio"
              name="search-radio"
              data-testid="first-letter-search-radio"
              id="first-letter-search-radio"
              onClick={ (e) => handlerInputRadio(e) }
              value="f"
            />
          </label>
        </div>
        <button
          className="btn-search"
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => updateDataToSearch() }
        >
          Buscar
        </button>
      </nav>
    </section>
  );
}
