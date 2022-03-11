import React from 'react';
import PropType from 'prop-types';

class Input extends React.Component {
  render() {
    const {
      text,
      testid,
      type,
      name,
      value,
      className,
      maxLength,
      onChange,
    } = this.props;
    return (
      <div className={ className }>
        <label htmlFor={ text }>{`${text} :`}</label>
        <input
          data-testid={ testid }
          id={ text }
          type={ type }
          name={ name }
          value={ value }
          maxLength={ maxLength }
          onChange={ onChange }
        />
      </div>
    );
  }
}

Input.propTypes = {
  text: PropType.string.isRequired,
  testid: PropType.string.isRequired,
  type: PropType.string.isRequired,
  name: PropType.string.isRequired,
  value: PropType.string.isRequired,
  className: PropType.string.isRequired,
  maxLength: PropType.string.isRequired,
  onChange: PropType.func.isRequired,
};

export default Input;
