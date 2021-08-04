import React, { useEffect, useState } from 'react';

const IngredientRecipes = ({ ingredient, typeDrinkorMeal, idItem }) => {
  const typeDoM = typeDrinkorMeal === 'comidas' ? 'meals' : 'cocktails';
  const [update, forceUpdate] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!getStorage) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        [typeDoM]: {
          [idItem]: [],
        },
      }));
      setInfo(getStorage);
    } else {
      setInfo(getStorage);
    }
  }, [idItem, typeDoM, update]);

  function addCheck(value) {
    if (info && info[typeDoM][idItem].length > 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...info,
        [typeDoM]: {
          [idItem]: [...info[typeDoM][idItem], value],
        },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...info,
        [typeDoM]: {
          [idItem]: [value],
        },
      }));
    }
  }

  function removeCheck(value) {
    info[typeDoM][idItem].forEach((itemCheck) => {
      if (itemCheck === value) {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          ...info,
          [typeDoM]: {
            [idItem]: [...info[typeDoM][idItem].filter((item) => item !== value)],
          },
        }));
      }
    });
  }

  function recipiesPorgress(target, value) {
    forceUpdate(!update);
    if (target.checked) {
      addCheck(value);
    } else { removeCheck(value); }
  }

  function stateCheckd(value) {
    if (info && info[typeDoM][idItem].length > 0) {
      return info[typeDoM][idItem].includes(value);
    }
    console.log('fudeu');
  }

  return (
    ingredient.map((item, index) => (
      <label
        key={ index }
        htmlFor={ index }
        data-testid={ `${index}-ingredient-step` }
      >
        <input
          type="checkbox"
          id={ index }
          checked={ stateCheckd(index) }
          onClick={ ({ target }) => {
            recipiesPorgress(target, index);
          } }
        />
        { item }
      </label>
    ))
  );
};

export default IngredientRecipes;
