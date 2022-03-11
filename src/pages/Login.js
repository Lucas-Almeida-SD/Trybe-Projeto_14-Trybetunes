import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';
import './Login.css';
import { headset, perfil } from '../helper/urlImage';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loadScreen: false,
      isBtnDisabled: true,
      login: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderLoadScreen = this.renderLoadScreen.bind(this);
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({ name: value }, () => this.validateBtn());
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({ loadScreen: true, isBtnDisabled: true }, async () => {
      const { name } = this.state;
      const image = perfil;
      await createUser({ name, image });
      this.setState({ loadScreen: false, login: true });
    });
  }

  validateBtn() {
    const { name } = this.state;
    const n3 = 3;
    if (name.length >= n3) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  }

  renderLoadScreen() {
    const { loadScreen, login } = this.state;
    if (loadScreen === true) {
      return (
        <Carregando className="carregando-login" />
      );
    }
    if (login === true) {
      return (<Redirect to="/Trybe-Projeto_14-Trybetunes/search" />);
    }
  }
 
  render() {
    const { name, isBtnDisabled } = this.state;
    const { handleChange, handleClick, renderLoadScreen } = this;
    return (
      <section className="login-section" data-testid="page-login">
        <section className="login-form-section">
          <div className="img-div"><img src={ headset } alt="headset" /></div>
          <h1>
            <span className="trybe">Trybe</span>
            <span className="tunes">Tunes</span>
          </h1>
          <form className="login-form" method="get">
            <input
              data-testid="login-name-input"
              type="text"
              value={ name }
              placeholder="Insira seu nome!"
              onChange={ handleChange }
            />
            <button
              data-testid="login-submit-button"
              type="submit"
              onClick={ handleClick }
              disabled={ isBtnDisabled }
            >
              Entrar
            </button>
          </form>
          <div className="carregando-div">
            {renderLoadScreen()}
          </div>
        </section>
      </section>
    );
  }
}

export default Login;
