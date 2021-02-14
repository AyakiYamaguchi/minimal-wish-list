import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import TopPage from './components/pages/TopPage';
import WishLists from './components/pages/WishLists';
import Signup from './components/pages/Signup';
import Signin from './components/pages/Signin';
import PrivateRoute from './components/templates/PrivateRoute';
import CreateWishList from './components/pages/CreateWishList';
import WishListDetail from './components/pages/WishListDetail';
import EditWishList from './components/pages/EditWishList';
import DiscardLists from './components/pages/DiscardLists';
import EditDiscardList from './components/pages/EditDiscardList';
import CreateDiscardList from './components/pages/CreateDiscardList';
import DiscardListDetail from './components/pages/DiscardListDetail';

function App() {
  return (
    <Router>
      <PrivateRoute />
      <Switch>
        <Route exact path="/top">
          <TopPage />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/wish-lists">
          <WishLists />
        </Route>
        <Route exact path="/wish-lists/:id">
          <WishListDetail />
        </Route>
        <Route exact path="/create-wishlist">
          <CreateWishList />
        </Route>
        <Route exact path="/wish-lists/:id/edit">
          <EditWishList />
        </Route>
        <Route exact path="/discard-lists">
          <DiscardLists />
        </Route>
        <Route exact path="/discard-lists/:id">
          <DiscardListDetail />
        </Route>
        <Route exact path="/create-discardlist">
          <CreateDiscardList />
        </Route>
        <Route exact path="/discard-lists/:id/edit">
          <EditDiscardList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
