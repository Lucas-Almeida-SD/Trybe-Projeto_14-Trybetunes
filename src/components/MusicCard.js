import React from 'react';
import PropType from 'prop-types';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';
import './MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loadScreen: false,
      favoriteMusicCheckbox: false,
    };
    this.onChange = this.onChange.bind(this);
    this.checkFavoriteMusics = this.checkFavoriteMusics.bind(this);
    this.renderFavoriteIcon = this.renderFavoriteIcon.bind(this);
  }

  componentDidMount() {
    this.checkFavoriteMusics();
  }

  onChange({ target }) {
    const { checked } = target;
    const { getFavoriteMusic } = this.props;
    this.setState({ favoriteMusicCheckbox: checked, loadScreen: true }, async () => {
      const { favoriteMusicCheckbox } = this.state;
      const { musicInfo } = this.props;
      if (favoriteMusicCheckbox) {
        await addSong(musicInfo);
        this.setState({ loadScreen: false });
      } else {
        await removeSong(musicInfo);
        this.setState({ loadScreen: false });
      }
      await getFavoriteMusic();
    });
  }

  checkFavoriteMusics() {
    const { musicInfo, favoriteTrackIds } = this.props;
    const { trackId } = musicInfo;
    if (favoriteTrackIds.includes(trackId)) {
      this.setState({ favoriteMusicCheckbox: true });
    }
  }

  renderFavoriteIcon() {
    const { favoriteMusicCheckbox, loadScreen } = this.state;
    if (favoriteMusicCheckbox && !loadScreen) {
      return (<BsSuitHeartFill />);
    }
    if (!loadScreen) {
      return (<BsSuitHeart />);
    }
    return (<Carregando className="carregando-music-card" />);
  }

  render() {
    const { onChange, renderFavoriteIcon } = this;
    const { musicInfo } = this.props;
    const { trackName, previewUrl, trackId, artworkUrl100 } = musicInfo;
    const { favoriteMusicCheckbox } = this.state;
    return (
      <div className="music-card">
        <div className="image-div">
          <img src={ artworkUrl100 } alt={ trackName } />
        </div>
        <div className="audio-track">
          <audio data-testid="audio-component" src={ previewUrl } controls >
            <track kind="captions" />
          </audio>
          <span>{trackName}</span>
        </div>
        <div className="favorite-checkbox">
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ favoriteMusicCheckbox }
            onChange={ onChange }
          />
          <label htmlFor={ trackId }>{ renderFavoriteIcon() }</label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicInfo: PropType.shape({
    trackName: PropType.string.isRequired,
    previewUrl: PropType.string.isRequired,
    trackId: PropType.number.isRequired,
    artworkUrl100: PropType.string.isRequired,
  }).isRequired,
  favoriteTrackIds: PropType.arrayOf(PropType.number.isRequired).isRequired,
  getFavoriteMusic: PropType.func.isRequired,
};

export default MusicCard;
