import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import MenuInferior from './MenuInferior';
import '../styles/Perfil.css';

function Perfil() {
  const emailUser = localStorage.getItem('user');
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="perfil-section">
      <Header />
      <h2 data-testid="page-title">Perfil</h2>
      <span data-testid="profile-email">{emailUser}</span>
      <button
        className="perfil"
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        <h3>Receitas Feitas</h3>
      </button>
      <button
        className="perfil"
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        <h3>Receitas Favoritas</h3>
      </button>
      <button
        className="perfil"
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logout }
      >
        <h3>Sair</h3>
      </button>
      <MenuInferior />
    </div>
  );
}

export default Perfil;
