import React from 'react';
import PropType from 'prop-types';
import Input from './Input';

class Form extends React.Component {
  clickImage() {
    document.querySelector('.btn-image-input').click();
  }

  render() {
    const { clickImage } = this;
    const {
      name,
      email,
      image,
      description,
      isSaveBtnDisabled,
      handleChange,
      handleClick,
    } = this.props;
    const text = 'Descrição';
    return (
      <form method="get" className="profile-edit-form">
        <div className="image-div">
          <img src={ image } alt={ name } aria-hidden="true" onClick={ clickImage } />
        </div>
        <input
          className="btn-image-input"
          type="file"
          name="image"
          accept="image/*"
          onChange={ handleChange }
        />
        <Input
          text="Nome"
          testid="edit-input-name"
          type="text"
          name="name"
          value={ name }
          className="name-div"
          maxLength="50"
          onChange={ handleChange }
        />
        <Input
          text="Email"
          testid="edit-input-email"
          type="text"
          name="email"
          value={ email }
          className="email-div"
          maxLength="70"
          onChange={ handleChange }
        />
        <div className="description-div">
          <label htmlFor={ text }>{`${text}: `}</label>
          <textarea
            testid="edit-input-description"
            rows="3"
            cols="30"
            name="description"
            value={ description }
            maxLength="70"
            onChange={ handleChange }
          />
        </div>
        <div className="save-btn-div">
          <button
            data-testid="edit-button-save"
            type="submit"
            onClick={ handleClick }
            disabled={ isSaveBtnDisabled }
          >
            Salvar
          </button>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  name: PropType.string.isRequired,
  email: PropType.string.isRequired,
  image: PropType.string.isRequired,
  description: PropType.string.isRequired,
  isSaveBtnDisabled: PropType.bool.isRequired,
  handleChange: PropType.func.isRequired,
  handleClick: PropType.func.isRequired,
};

export default Form;
