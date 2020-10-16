import './App.css';
import Home from './components/home';
import Game from './components/game';
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <h1 className="white"> Who's That Pokemon? </h1>
      {/* <div className="pokeball">
        <div className="pokeball__button"></div>
      </div> */}
      <Router>
        <Route path="/whosthatpokemon" exact component={Home} />
        <Route path="/game" component={Game} />
      </Router>
    </div>
  );
}

export default App;
