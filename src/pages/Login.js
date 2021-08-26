import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import restaurante from '../images/restaurante.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = ({ target: { value } }) => {
    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (checkEmail.test(value)) return setEmail(value);
    return setEmail('');
  };

  const handleChangePassword = ({ target: { value } }) => {
    const checkPassword = 6;
    if (value.length > checkPassword) return setPassword(value);
    return setPassword('');
  };

  const LoginStorage = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  return (
    <div className="login">
      <img
        className="logo"
        src={ restaurante }
        alt="restaurante"
      />
      <input
        className="input-login"
        type="text"
        placeholder="Digite seu e-mail"
        data-testid="email-input"
        onChange={ handleChangeEmail }
      />
      <input
        className="input-login"
        type="password"
        placeholder="Digite sua senha"
        data-testid="password-input"
        onChange={ handleChangePassword }
      />
      <Link to="/comidas">
        <button
          className="button"
          type="button"
          data-testid="login-submit-btn"
          disabled={ !email || !password }
          onClick={ LoginStorage }
        >
          Entrar
        </button>
      </Link>
    </div>
  );
}
