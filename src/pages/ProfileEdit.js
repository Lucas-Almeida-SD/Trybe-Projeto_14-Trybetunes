import React from 'react';
import PropType from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from './Carregando';
import { getUser, updateUser } from '../services/userAPI';
import Form from '../components/Form';
import './ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loadScreen: true,
      name: '',
      email: '',
      image: '',
      description: '',
      isSaveBtnDisabled: true,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getUrlImage = this.getUrlImage.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.validateSaveBtn = this.validateSaveBtn.bind(this);
    this.renderProfileEdit = this.renderProfileEdit.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  async componentDidMount() {
    await this.getUserInfo();
    this.validateSaveBtn();
  }

  handleChange({ target }) {
    const { name } = target;
    if (name === 'image') {
      this.getUrlImage();
    } else {
      const { value } = target;
      this.setState({ [name]: value }, () => this.validateSaveBtn());
    }
  }

  handleClick(event) {
    event.preventDefault();
    const { disableEnableBtnPage } = this.props;
    disableEnableBtnPage(true);
    this.setState({ loadScreen: true }, async () => {
      const { name, email, image, description } = this.state;
      await updateUser({ name, email, image, description });
      this.setState({ redirect: true });
    });
  }

  getUrlImage() {
    const imageBtn = document.querySelector('.btn-image-input');
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result;
      this.setState({ image: url });
    };
    reader.readAsDataURL(imageBtn.files[0]);
  }

  async getUserInfo() {
    const user = await getUser();
    const { name, email, image, description } = user;
    this.setState({ loadScreen: false, name, email, image, description });
  }

  validateSaveBtn() {
    const { name, email, image, description } = this.state;
    const splitedEmail = email.split('@');
    const lengthEmail = email.length;
    const n2 = 2;
    const n4 = 4;
    const n5 = 5;
    const condition1 = name !== '' && email !== '' && image !== '' && description !== '';
    const condition2 = email.includes('@') && email.slice(lengthEmail - n4) === '.com';
    const condition3 = splitedEmail[0].length > 0;
    const condition4 = splitedEmail.length === n2;
    const condition5 = email[lengthEmail - n5] !== '@';
    if (condition1 && condition2 && condition3 && condition4 && condition5) {
      this.setState({ isSaveBtnDisabled: false });
    } else {
      this.setState({ isSaveBtnDisabled: true });
    }
  }

  renderProfileEdit() {
    const { loadScreen, name, email, image, description, isSaveBtnDisabled } = this.state;
    const { handleChange, handleClick } = this;
    if (!loadScreen) {
      return (
        <section>
          <Form
            name={ name }
            email={ email }
            image={ image }
            description={ description }
            isSaveBtnDisabled={ isSaveBtnDisabled }
            handleChange={ handleChange }
            handleClick={ handleClick }
          />
        </section>
      );
    }
    return <Carregando className="carregando-profile-edit" />;
  }

  renderRedirect() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/Trybe-Projeto_14-Trybetunes/profile" />;
    }
  }

  render() {
    const { renderProfileEdit, renderRedirect } = this;
    const { pesquisa, favoritas, perfil, changePage, isBtnPageDisabled } = this.props;
    const { disableEnableBtnPage } = this.props;
    const { match } = this.props;
    const { url: page } = match;
    return (
      <div data-testid="page-profile-edit">
        <Header
          pesquisa={ pesquisa }
          favoritas={ favoritas }
          perfil={ perfil }
          changePage={ changePage }
          page={ page }
          isBtnPageDisabled={ isBtnPageDisabled }
          disableEnableBtnPage={ disableEnableBtnPage }
        />
        <section className="profile-edit-section">
          {renderProfileEdit()}
          {renderRedirect()}
        </section>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  pesquisa: PropType.string.isRequired,
  favoritas: PropType.string.isRequired,
  perfil: PropType.string.isRequired,
  match: PropType.shape({ url: PropType.string.isRequired }).isRequired,
  changePage: PropType.func.isRequired,
  isBtnPageDisabled: PropType.bool.isRequired,
  disableEnableBtnPage: PropType.func.isRequired,
};

export default ProfileEdit;
