import React from 'react';
import PropType from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
import './Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteMusics: undefined,
    };
    this.getFavoriteMusic = this.getFavoriteMusic.bind(this);
    this.renderFavMusics = this.renderFavMusics.bind(this);
  }

  componentDidMount() {
    this.getFavoriteMusic();
  }

  getFavoriteMusic() {
    this.setState({ favoriteMusics: undefined }, async () => {
      const favoriteMusics = await getFavoriteSongs();
      this.setState({ favoriteMusics });
    });
  }

  renderFavMusics() {
    const { favoriteMusics } = this.state;
    const { getFavoriteMusic } = this;
    if (favoriteMusics) {
      if (favoriteMusics.length === 0) {
        return (
          <section className="no-favorites-section">
            <p>Não há músicas favoritas!</p>
          </section>
        );
      }
      const favoriteTrackIds = favoriteMusics.map((element) => element.trackId);
      return (
        <section className="favorites-section">
          <h2 className="favorite-musics-title">Músicas Favoritas</h2>
          {favoriteMusics.map((element) => (
            <MusicCard
              key={ element.trackName }
              musicInfo={ element }
              favoriteTrackIds={ favoriteTrackIds }
              getFavoriteMusic={ getFavoriteMusic }
            />
          ))}
        </section>
      );
    }
    return <Carregando className="carregando-favorites" />;
  }

  render() {
    const { renderFavMusics } = this;
    const { pesquisa, favoritas, perfil, changePage, isBtnPageDisabled } = this.props;
    const { disableEnableBtnPage } = this.props;
    const { match } = this.props;
    const { url: page } = match;
    return (
      <div data-testid="page-favorites">
        <Header
          pesquisa={ pesquisa }
          favoritas={ favoritas }
          perfil={ perfil }
          page={ page }
          changePage={ changePage }
          isBtnPageDisabled={ isBtnPageDisabled }
          disableEnableBtnPage={ disableEnableBtnPage }
        />
        {renderFavMusics()}
      </div>
    );
  }
}

Favorites.propTypes = {
  pesquisa: PropType.string.isRequired,
  favoritas: PropType.string.isRequired,
  perfil: PropType.string.isRequired,
  match: PropType.shape({ url: PropType.string.isRequired }).isRequired,
  changePage: PropType.func.isRequired,
  isBtnPageDisabled: PropType.bool.isRequired,
  disableEnableBtnPage: PropType.func.isRequired,
};

export default Favorites;
