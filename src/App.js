import './App.css';
import Home from './components/home';
import Game from './components/game';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      {/* <h1 className="white"> Who's That Pokemon? </h1> */}
      <img src="https://fontmeme.com/permalink/201026/34dc01a9b6cca54ffa149506edf63ddf.png" alt="Who's that Pokemon?" className="title"/>
      {/* <div className="pokeball">
        <div className="pokeball__button"></div>
      </div> */}
      <Router>
        <Route path="/whosthatpokemon" exact component={Home} />
        <Route path="/whosthatpokemon/game" component={Game} />
      </Router>
      <div className="footer">
        All images © Nintendo. Artwork from Veekun.
        <br />
       <a href="https://github.com/mokshithpyla/whosthatpokemon" style={{textDecoration:"none"}}> GitHub </a>
      </div>
    </div>
  );
}

export default App;
