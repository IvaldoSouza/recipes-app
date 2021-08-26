import React from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';

export default function ButtonSearchTop({ openSearchBar }) {
  const { setIsSearch, isSearch } = openSearchBar;
  return (
    <div>
      <button type="button" onClick={ () => setIsSearch(!isSearch) }>
        <img
          src={ searchIcon }
          alt="search"
          data-testid="search-top-btn"
        />
      </button>
    </div>
  );
}

ButtonSearchTop.propTypes = {
  openSearchBar: PropTypes.shape({
    isSearch: PropTypes.bool,
    setIsSearch: PropTypes.func,
  }).isRequired,
};
