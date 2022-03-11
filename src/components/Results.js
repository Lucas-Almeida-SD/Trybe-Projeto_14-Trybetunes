import React from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import './Results.css';

class Results extends React.Component {
  renderResult(artista, albums) {
    if (albums.length > 0) {
      return (
        <section className="result-found">
          <h2>
            Resultado de álbuns de:
            <br />
            <span>{` ${artista}`}</span>
          </h2>
          <section className="albums-section">
            {albums.map((element) => (
              <Link
                key={ element.collectionId }
                data-testid={ `link-to-album-${element.collectionId}` }
                to={ `/album/${element.collectionId}` }
              >
                <div className="album">
                  <div className="image-div">
                    <img src={ element.artworkUrl100 } alt={ element.collectionName } />
                  </div>
                  <p className="album-name">{element.collectionName}</p>
                  <p className="artist-name">{element.artistName}</p>
                </div>
              </Link>
            ))}
          </section>
        </section>
      );
    }
    return (
      <section className="no-result">
        <p>Nenhum álbum foi encontrado</p>
      </section>
    );
  }

  render() {
    const { artista, albums } = this.props;
    const { renderResult } = this;
    return (
      <section className="result">
        {renderResult(artista, albums)}
      </section>
    );
  }
}

Results.propTypes = {
  artista: PropType.string.isRequired,
  albums: PropType.arrayOf(PropType.shape(
    {
      artistName: PropType.string.isRequired,
      collectionId: PropType.number.isRequired,
      collectionName: PropType.string.isRequired,
      artworkUrl100: PropType.string.isRequired,
    },
  ).isRequired).isRequired,
};

export default Results;
