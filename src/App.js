import './App.css';
import Home from './components/home';
import Game from './components/game';
import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1> Who's That Pokemon? </h1>
      <Router>
        <Route path="/whodatpokemon" exact component={Home} />
        <Route path="/game" component={Game} />
      </Router>
    </div>
  );
}

export default App;
