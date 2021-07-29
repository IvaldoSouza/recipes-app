import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getEmail } from '../actions';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [login, setLogin] = React.useState({ email: '', password: '' });
  const [disabled, setDisabled] = React.useState(true);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLogin({ ...login, [name]: value });
  };

  const validateState = () => {
    const { password, email } = login;
    const regex = /(.+)@(.+){2,}\.(.+){3,}/;
    const passwordMinLength = 6;
    if (regex.test(email) && password.length > passwordMinLength && disabled) {
      setDisabled(false);
    } else if ((!regex.test(email) || password.length <= passwordMinLength)
     && !disabled) {
      setDisabled(true);
    }
  };

  return (
    <div>
      <input
        type="text"
        name="email"
        data-testid="email-input"
        value={ login.email }
        onChange={ handleChange }
        onKeyUp={ validateState }
      />
      <input
        type="password"
        name="password"
        data-testid="password-input"
        value={ login.password }
        onChange={ handleChange }
        onKeyUp={ validateState }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ () => {
          dispatch(getEmail(login.email));
          history.push('/comidas');
        } }
        disabled={ disabled }
      >
        Entrar
      </button>
    </div>
  );
};

export default Login;
