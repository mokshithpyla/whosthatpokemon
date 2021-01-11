import React, { Component } from 'react';
import { DefaultButton } from 'office-ui-fabric-react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import '../App.css';

class Home extends Component {

  buttonStyle = {
    root: {
      border: 'none',
      color: "white",
      backgroundColor: "#001c67"
    },
    rootHovered: {
      backgroundColor: '#05AAD9',
      color: '#05AAD9'
    },
    rootPressed: {
      backgroundColor: '#05AAD9',
      color: '#05AAD9',
      boxShadow: '0 0 10px 1px black'
    }
  }

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
        <Link to="/whosthatpokemon/game"> <DefaultButton text="Start Guessing!" styles={this.buttonStyle}/> </Link>
          </div>
      </div>
    );
  }

  componentDidMount() {
    this.setTitleAndDescription();
  }

  setTitleAndDescription = () => {
    document.title = `Who's thaat Pokémon?`
    let meta = document.createElement("meta");
    meta.name = "description";
    meta.content = "Gotta Catch 'em all pokemonnn "
    document.getElementsByTagName("head")[0].appendChild(meta);
  };
}

export default Home;