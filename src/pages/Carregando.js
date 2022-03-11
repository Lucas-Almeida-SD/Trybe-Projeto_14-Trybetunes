import React from 'react';
import PropType from 'prop-types';

class Carregando extends React.Component {
  render() {
    const { className } = this.props;
    return (
      <div className={ className }>
        <p>Carregando...</p>
      </div>
    );
  }
}

Carregando.propTypes = {
  className: PropType.string.isRequired,
};

export default Carregando;
