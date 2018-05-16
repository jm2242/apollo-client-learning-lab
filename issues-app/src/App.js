import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Settings from "./Settings"
import Navigation from "./Navigation"
import logo from './logo.svg';
import './App.css';
import './style.css'


import Profile from './Profile'
import IssuesList from "./IssuesList"
class App extends Component {
  render() {
    return (
      <Router>
        <div style={{textAlign: "center"}}>
          <Navigation />
          <Profile  />
          <Route
            component={() => <IssuesList />}
            path={'/issues'}
          />
          <Route
            component={() => <Settings />}
            path={'/settings'}
          />
        </div>
      </Router>
    );
  }
}

export default App;
