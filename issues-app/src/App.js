import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css'
import Profile from './Profile'
import IssuesList from "./IssuesList"
class App extends Component {
  render() {
    return (
      <div style={{textAlign: "center"}}>
        <Profile  />
        <IssuesList />
      </div>
    );
  }
}

export default App;
