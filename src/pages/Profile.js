import React from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import './Profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
    };
    this.getUserInfo = this.getUserInfo.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  async getUserInfo() {
    const user = await getUser();
    this.setState({ user });
  }

  renderProfile() {
    const { user } = this.state;
    if (user) {
      const { name, email, image, description } = user;
      return (
        <section className="profile">
          <div className="profile-image-div">
            <img data-testid="profile-image" src={ image } alt={ name } />
            <Link to="/Trybe-Projeto_14-Trybetunes/profile/edit">Editar perfil</Link>
          </div>
          <p className="name">
            <span>Nome:</span>
            <span>{name}</span>
          </p>
          <p className="email">
            <span>Email:</span>
            <span>{email}</span>
          </p>
          <p className="description">
            <span>Descrição:</span>
            <span>{description}</span>
          </p>
        </section>
      );
    }
    return <Carregando className="carregando-profile" />;
  }

  render() {
    const { pesquisa, favoritas, perfil, changePage, isBtnPageDisabled } = this.props;
    const { disableEnableBtnPage } = this.props;
    const { match } = this.props;
    const { url: page } = match;
    const { renderProfile } = this;
    return (
      <div data-testid="page-profile">
        <Header
          pesquisa={ pesquisa }
          favoritas={ favoritas }
          perfil={ perfil }
          page={ page }
          changePage={ changePage }
          isBtnPageDisabled={ isBtnPageDisabled }
          disableEnableBtnPage={ disableEnableBtnPage }
        />
        <section className="profile-section">
          {renderProfile()}
        </section>
      </div>
    );
  }
}

Profile.propTypes = {
  pesquisa: PropType.string.isRequired,
  favoritas: PropType.string.isRequired,
  perfil: PropType.string.isRequired,
  match: PropType.shape({ url: PropType.string.isRequired }).isRequired,
  changePage: PropType.func.isRequired,
  isBtnPageDisabled: PropType.bool.isRequired,
  disableEnableBtnPage: PropType.func.isRequired,
};

export default Profile;
