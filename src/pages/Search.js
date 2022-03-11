import React from 'react';
import PropType from 'prop-types';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';
import Results from '../components/Results';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      isSearchBtnDisabled: true,
      loadScreen: false,
      artista: '',
      albums: [],
      displayResults: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderSearchInput = this.renderSearchInput.bind(this);
    this.renderResults = this.renderResults.bind(this);
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({ search: value }, () => this.validateSearchBtn());
  }

  handleClick() {
    const { search } = this.state;
    const { disableEnableBtnPage } = this.props;
    disableEnableBtnPage(true);
    this.setState({
      artista: search,
      search: '',
      loadScreen: true,
      displayResults: false,
    }, async () => {
      const albums = await searchAlbumsAPI(search);
      disableEnableBtnPage(false);
      this.setState({
        albums,
        loadScreen: false,
        displayResults: true,
        isSearchBtnDisabled: true });
    });
  }

  validateSearchBtn() {
    const { search } = this.state;
    if (search.length >= 2) {
      this.setState({ isSearchBtnDisabled: false });
    } else {
      this.setState({ isSearchBtnDisabled: true });
    }
  }

  renderSearchInput(handleChange, handleClick) {
    const { loadScreen, search, isSearchBtnDisabled } = this.state;
    if (!loadScreen) {
      return (
        <div className="input-div">
          <input
            data-testid="search-artist-input"
            type="text"
            value={ search }
            placeholder="Faça sua pesquisa!"
            onChange={ handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            onClick={ handleClick }
            disabled={ isSearchBtnDisabled }
          >
            Pesquisar
          </button>
        </div>
      );
    }
    return (
      <Carregando className="carregando-search" />
    );
  }

  renderResults() {
    const { displayResults, artista, albums } = this.state;
    if (displayResults) {
      return (<Results artista={ artista } albums={ albums } />);
    }
  }

  render() {
    const { handleChange, handleClick, renderSearchInput, renderResults } = this;
    const { pesquisa, favoritas, perfil, changePage, isBtnPageDisabled } = this.props;
    const { disableEnableBtnPage } = this.props;
    const { match } = this.props;
    const { url: page } = match;
    return (
      <div data-testid="page-search" className="search-div">
        <Header
          pesquisa={ pesquisa }
          favoritas={ favoritas }
          perfil={ perfil }
          page={ page }
          changePage={ changePage }
          isBtnPageDisabled={ isBtnPageDisabled }
          disableEnableBtnPage={ disableEnableBtnPage }
        />
        {renderSearchInput(handleChange, handleClick)}
        {renderResults()}
      </div>
    );
  }
}

Search.propTypes = {
  pesquisa: PropType.string.isRequired,
  favoritas: PropType.string.isRequired,
  perfil: PropType.string.isRequired,
  match: PropType.shape({ url: PropType.string.isRequired }).isRequired,
  changePage: PropType.func.isRequired,
  isBtnPageDisabled: PropType.bool.isRequired,
  disableEnableBtnPage: PropType.func.isRequired,
};

export default Search;
