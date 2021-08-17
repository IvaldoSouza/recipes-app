import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import '../StartRecipe.css';

class StartRecipe extends Component {
  checkRecipesStatus() {
    const { id } = this.props;
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (doneRecipes && doneRecipes.find((item) => item.id === id)) {
      return '';
    }
    if (recipesInProgress
      && Object.prototype.hasOwnProperty.call(recipesInProgress.meals, id)) {
      return (
        <Link to={ `/comidas/${id}/in-progress` }>
          <Button
            className="start-recipe"
            data-testid="start-recipe-btn"
            variant="warning"
          >
            Continuar Receita
          </Button>
        </Link>
      );
    }
    return (
      <Link to={ `/comidas/${id}/in-progress` }>
        <Button
          className="start-recipe"
          data-testid="start-recipe-btn"
          variant="warning"
        >
          Iniciar Receita
        </Button>
      </Link>
    );
  }

  render() {
    return (
      this.checkRecipesStatus()
    );
  }
}

StartRecipe.propTypes = {
  id: PropTypes.string.isRequired,
};

export default StartRecipe;
