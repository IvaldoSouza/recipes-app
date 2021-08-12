import React from 'react';
import PropTypes from 'prop-types';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

// Adicionar biblioteca de compartilhar e imagem de coração para o favoritar.
function MealRecipeCard({ title, img, category }) {
  return (
    <div>

      <img
        height="200px"
        width="200px"
        data-testid="recipe-photo"
        alt="Foto da receita"
        src={ img }
      />

      <br />

      <span data-testid="recipe-title">
        {`${title} `}
      </span>

      <p data-testid="recipe-category">
        {category}
      </p>

      <ShareButton />
      <FavoriteButton />
    </div>
  );
}

export default MealRecipeCard;

MealRecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};