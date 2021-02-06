import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import TopPage from './components/pages/TopPage';
import WishLists from './components/pages/WishLists';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/top">
          <TopPage />
        </Route>
        <Route exact path="/wish-lists">
          <WishLists />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
