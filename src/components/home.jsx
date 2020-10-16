import React, { Component } from 'react';
import { DefaultButton } from 'office-ui-fabric-react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import '../App.css';

class Home extends Component {

  render() {
    return (
      <div className="pokedex">
        <div className="circle-parent">
          <div className="circle">
            <div className="inner-circle"></div>
          </div>
          <div className="circle-sm red ml15"></div>
          <div className="circle-sm yellow ml10"></div>
          <div className="circle-sm  green ml10"></div>
        </div>
        <div className="canvasContainer">
        <Link to="/game"> <DefaultButton text="Start Guessing!" /> </Link>
          </div>
        {/* <Link to="/game"> <DefaultButton text="Start Guessing!" /> </Link> */}
      </div>
    );
  }
}

export default Home;