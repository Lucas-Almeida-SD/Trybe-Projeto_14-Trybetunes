import React from 'react';
import './NotFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found" className="not-found-div">
        <p>Not Found</p>
      </div>
    );
  }
}

export default NotFound;
