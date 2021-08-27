import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import Categories from './Categories';
import ButtonSearchTop from './ButtonSearchTop';
import '../styles/Header.css';

function Header() {
  const [isSearch, setIsSearch] = useState(false);
  const location = useLocation();

  function getPageTitle() {
    const path = location.pathname;
    const area = '/explorar/comidas/area';
    const receitasFeitas = '/receitas-feitas';
    const receitasFavoritas = '/receitas-favoritas';
    let pageTitle = '';
    if (path === receitasFeitas) {
      pageTitle = 'Receitas Feitas';
    } else if (path === receitasFavoritas) {
      pageTitle = 'Receitas Favoritas';
    } else if (path.split('/').length === 2 && path !== receitasFeitas) {
      const title = `${path.split('/')[1]} `;
      pageTitle = title.charAt(0).toUpperCase() + title.slice(1);
    } else if (path === area) {
      pageTitle = 'Explorar Origem';
    } else if (path !== area || path !== receitasFeitas) {
      const end = path.split('/').length - 1;
      const pageTitle1 = `${path.split('/')[1]}`;
      const title1 = pageTitle1.charAt(0).toUpperCase() + pageTitle1.slice(1);
      const pageTitle2 = `${path.split('/')[end]}`;
      const title2 = pageTitle2.charAt(0).toUpperCase() + pageTitle2.slice(1);
      pageTitle = `${title1} ${title2}`;
    }
    return pageTitle;
  }

  const searchButtonElements = {
    setIsSearch,
    isSearch,
  };

  function classNameButtonSearch() {
    if (
      location.pathname === '/comidas'
      || location.pathname === '/bebidas'
      || location.pathname === '/explorar/area'
      || location.pathname === '/explorar/comidas/area'
    ) {
      return 'visible';
    }
    return 'hidden';
  }

  return (
    <header className="header-section-top">
      <div className="header-section">
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="user"
            data-testid="profile-top-btn"
          />
        </Link>
        <h3 data-testid="page-title">{ getPageTitle() }</h3>
        {/* { location.pathname === '/comidas'
          && <ButtonSearchTop openSearchBar={ searchButtonElements } />}
        { location.pathname === '/bebidas'
          && <ButtonSearchTop openSearchBar={ searchButtonElements } />}
        { location.pathname === '/explorar/area'
          && <ButtonSearchTop openSearchBar={ searchButtonElements } />}
        { location.pathname === '/explorar/comidas/area'
          && <ButtonSearchTop openSearchBar={ searchButtonElements } />} */}
        <nav className={ classNameButtonSearch() }>
          <ButtonSearchTop openSearchBar={ searchButtonElements } />
        </nav>
      </div>
      { isSearch && <SearchBar /> }
      { location.pathname === '/comidas' && <Categories /> }
      { location.pathname === '/bebidas' && <Categories /> }
    </header>
  );
}

export default Header;
