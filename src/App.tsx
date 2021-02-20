import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import TopPage from './components/pages/TopPage';
import WishLists from './components/pages/WishLists';
import PrivateRoute from './components/templates/PrivateRoute';
import CreateWishList from './components/pages/CreateWishList';
import WishListDetail from './components/pages/WishListDetail';
import EditWishList from './components/pages/EditWishList';
import DiscardLists from './components/pages/DiscardLists';
import EditDiscardList from './components/pages/EditDiscardList';
import CreateDiscardList from './components/pages/CreateDiscardList';
import DiscardListDetail from './components/pages/DiscardListDetail';
import AccountSettings from './components/pages/AccountSettings';
import OnboadingCreateList from './components/pages/OnboadingCreateList';
import OnboadingDiscard from './components/pages/OnboadingDiscard';
import OnboadingPriority from './components/pages/OnboadingPriority';
import LandingPage from './components/pages/LandingPage';

function App() {
  return (
    <Router>
      
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/top">
          <TopPage />
        </Route>
        <PrivateRoute exact path="/onboading/create-list">
          <OnboadingCreateList />
        </PrivateRoute>
        <PrivateRoute exact path="/onboading/priority">
          <OnboadingPriority />
        </PrivateRoute>
        <PrivateRoute exact path="/onboading/discard">
          <OnboadingDiscard />
        </PrivateRoute>
        <PrivateRoute exact path="/wish-lists">
          <WishLists />
        </PrivateRoute>
        <PrivateRoute exact path="/wish-lists/:id">
          <WishListDetail />
        </PrivateRoute>
        <PrivateRoute exact path="/create-wishlist">
          <CreateWishList />
        </PrivateRoute>
        <PrivateRoute exact path="/wish-lists/:id/edit">
          <EditWishList />
        </PrivateRoute>
        <PrivateRoute exact path="/discard-lists">
          <DiscardLists />
        </PrivateRoute>
        <PrivateRoute exact path="/discard-lists/:id">
          <DiscardListDetail />
        </PrivateRoute>
        <PrivateRoute exact path="/create-discardlist">
          <CreateDiscardList />
        </PrivateRoute>
        <PrivateRoute exact path="/discard-lists/:id/edit">
          <EditDiscardList />
        </PrivateRoute>
        <PrivateRoute exact path="/account-settings">
          <AccountSettings />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
