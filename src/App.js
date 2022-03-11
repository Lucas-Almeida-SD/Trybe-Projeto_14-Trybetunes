import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import './App.css';

const notSelected = 'not-selected';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      search: 'selected',
      favorites: notSelected,
      profile: notSelected,
      selectedPage: 'search',
      isBtnPageDisabled: true,
    };
    this.changePage = this.changePage.bind(this);
    this.disableEnableBtnPage = this.disableEnableBtnPage.bind(this);
  }

  changePage(page) {
    const pageName = page.split('/')[2];
    const { selectedPage } = this.state;
    this.setState({
      selectedPage: pageName,
      [selectedPage]: 'not-selected',
      [pageName]: 'selected',
    });
  }

  disableEnableBtnPage(value) {
    this.setState({ isBtnPageDisabled: value });
  }

  render() {
    const { search, favorites, profile, selectedPage, isBtnPageDisabled } = this.state;
    const { disableEnableBtnPage } = this;
    const { changePage } = this;
    return (
      <section>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/Trybe-Projeto_14-Trybetunes/search"
              render={ (props) => (<Search
                { ...props }
                pesquisa={ search }
                favoritas={ favorites }
                perfil={ profile }
                changePage={ changePage }
                isBtnPageDisabled={ isBtnPageDisabled }
                disableEnableBtnPage={ disableEnableBtnPage }
              />
              ) }
            />
            <Route
              exact
              path="/Trybe-Projeto_14-Trybetunes/album/:id"
              render={ (props) => (<Album
                { ...props }
                pesquisa={ search }
                favoritas={ favorites }
                perfil={ profile }
                changePage={ changePage }
                isBtnPageDisabled={ isBtnPageDisabled }
                disableEnableBtnPage={ disableEnableBtnPage }
              />
              ) }
            />
            <Route
              exact
              path="/Trybe-Projeto_14-Trybetunes/favorites"
              render={ (props) => (<Favorites
                { ...props }
                pesquisa={ search }
                favoritas={ favorites }
                perfil={ profile }
                changePage={ changePage }
                isBtnPageDisabled={ isBtnPageDisabled }
                disableEnableBtnPage={ disableEnableBtnPage }
              />
              ) }
            />
            <Route
              exact
              path="/Trybe-Projeto_14-Trybetunes/profile"
              render={ (props) => (<Profile
                { ...props }
                pesquisa={ search }
                favoritas={ favorites }
                perfil={ profile }
                selectedPage={ selectedPage }
                changePage={ changePage }
                isBtnPageDisabled={ isBtnPageDisabled }
                disableEnableBtnPage={ disableEnableBtnPage }
              />
              ) }
            />
            <Route
              exact
              path="/Trybe-Projeto_14-Trybetunes/profile/edit"
              render={ (props) => (<ProfileEdit
                { ...props }
                pesquisa={ search }
                favoritas={ favorites }
                perfil={ profile }
                selectedPage={ selectedPage }
                changePage={ changePage }
                isBtnPageDisabled={ isBtnPageDisabled }
                disableEnableBtnPage={ disableEnableBtnPage }
              />
              ) }
            />
            <Route exact path="/Trybe-Projeto_14-Trybetunes/" component={ Login } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </section>
    );
  }
}

export default App;
