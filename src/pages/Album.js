import React from 'react';
import PropType from 'prop-types';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Carregando from './Carregando';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import './Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: undefined,
      favoriteMusics: undefined,
      awaitGetFavMusics: true,
    };
    this.getMusics = this.getMusics.bind(this);
    this.getFavoriteMusic = this.getFavoriteMusic.bind(this);
  }

  componentDidMount() {
    this.getMusics();
    this.getFavoriteMusic();
  }

  async getMusics() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musics = await musicsAPI(id);
    this.setState({ musics });
  }

  async getFavoriteMusic() {
    const favoriteMusics = await getFavoriteSongs();
    this.setState({ favoriteMusics, awaitGetFavMusics: false });
  }

  renderMusics() {
    const { musics, awaitGetFavMusics, favoriteMusics } = this.state;
    const { getFavoriteMusic } = this;
    if (musics && !awaitGetFavMusics) {
      const { artworkUrl100, artistName, collectionName } = musics[0];
      const favoriteTrackIds = favoriteMusics.map((element) => element.trackId);
      return (
        <section className="musics-result">
          <section className="album-selected">
            <div className="album-div">
              <div>
                <img src={ artworkUrl100 } alt={ collectionName } />
              </div>
              <h2 data-testid="album-name">{collectionName}</h2>
              <h3 data-testid="artist-name">{artistName}</h3>
            </div>
          </section>
          <section className="music-card-section">
            {musics.slice(1).map((element) => (
              <MusicCard
                key={ element.trackName }
                musicInfo={ element }
                favoriteTrackIds={ favoriteTrackIds }
                getFavoriteMusic={ getFavoriteMusic }
              />
            ))}
          </section>
        </section>
      );
    }
    return <Carregando className="carregando-album" />;
  }

  render() {
    const { pesquisa, favoritas, perfil, changePage, isBtnPageDisabled } = this.props;
    const { disableEnableBtnPage } = this.props;
    const { match } = this.props;
    const { url: page } = match;
    return (
      <div data-testid="page-album">
        <Header
          pesquisa={ pesquisa }
          favoritas={ favoritas }
          perfil={ perfil }
          page={ page }
          changePage={ changePage }
          isBtnPageDisabled={ isBtnPageDisabled }
          disableEnableBtnPage={ disableEnableBtnPage }
        />
        {this.renderMusics()}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropType.shape({
    url: PropType.string.isRequired,
    params: PropType.shape({
      id: PropType.string.isRequired,
    }).isRequired,
  }).isRequired,
  pesquisa: PropType.string.isRequired,
  favoritas: PropType.string.isRequired,
  perfil: PropType.string.isRequired,
  changePage: PropType.func.isRequired,
  isBtnPageDisabled: PropType.bool.isRequired,
  disableEnableBtnPage: PropType.func.isRequired,
};

export default Album;
