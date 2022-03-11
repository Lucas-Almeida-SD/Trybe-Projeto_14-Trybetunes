import React from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';
import './Header.css';
import { logoTrybetunes } from '../helper/urlImage';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      image: '',
      loadScreen: false,
    };
    this.getLoginName = this.getLoginName.bind(this);
    this.renderLoadScreen = this.renderLoadScreen.bind(this);
  }

  componentDidMount() {
    const { page, changePage } = this.props;
    changePage(page);
    this.getLoginName();
  }

  getLoginName() {
    const { disableEnableBtnPage } = this.props;
    disableEnableBtnPage(true);
    this.setState({ loadScreen: true }, async () => {
      const { name, image } = await getUser();
      disableEnableBtnPage(false);
      this.setState({ name, image, loadScreen: false });
    });
  }

  renderLoadScreen() {
    const { loadScreen, name } = this.state;
    if (loadScreen) {
      return (
        <Carregando className="carregando-user" />
      );
    }
    return (
      <p data-testid="header-user-name">{name}</p>
    );
  }

  render() {
    const { renderLoadScreen } = this;
    const { image } = this.state;
    const { pesquisa, favoritas, perfil, isBtnPageDisabled } = this.props;
    return (
      <header data-testid="header-component">
        <section className="logo-section">
          <div className="logo-image-div">
            <img src={ logoTrybetunes } alt="Trybetunes Logo" />
          </div>
          <div className="perfil-div">
            <img src={ image } alt="perfil" />
            {renderLoadScreen()}
          </div>
        </section>
        <section className="links-section">
          <Link to="/Trybe-Projeto_14-Trybetunes/search" data-testid="link-to-search">
            <button
              type="button"
              className={ pesquisa }
              id="pesquisa"
              disabled={ isBtnPageDisabled }
            >
              Pesquisa
            </button>
          </Link>
          <Link to="/Trybe-Projeto_14-Trybetunes/favorites" data-testid="link-to-favorites">
            <button
              type="button"
              className={ favoritas }
              id="favoritas"
              disabled={ isBtnPageDisabled }
            >
              Favoritas
            </button>
          </Link>
          <Link to="/Trybe-Projeto_14-Trybetunes/profile" data-testid="link-to-profile">
            <button
              type="button"
              className={ perfil }
              id="perfil"
              disabled={ isBtnPageDisabled }
            >
              Perfil
            </button>
          </Link>
        </section>
      </header>
    );
  }
}

Header.propTypes = {
  pesquisa: PropType.string.isRequired,
  favoritas: PropType.string.isRequired,
  perfil: PropType.string.isRequired,
  page: PropType.string.isRequired,
  isBtnPageDisabled: PropType.bool.isRequired,
  changePage: PropType.func.isRequired,
  disableEnableBtnPage: PropType.func.isRequired,
};

export default Header;
