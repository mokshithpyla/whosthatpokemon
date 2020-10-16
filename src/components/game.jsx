import { DefaultButton, TextField } from '@fluentui/react';
import React, { Component } from 'react';
import pokemonNames from '../script';
import '../App.css';
const maskFormat = {
  '*': /[a-zA-Z0-9_]/,
};

const images = require.context('../images', true);


class Game extends Component {
  state = {
    revealed: false,
    currentPokemonNumbers: Array.from({ length: 151 }, (_, i) => i + 1),
    time: {},
    seconds: 3,
    img: null,
    guess: ''
  }
  constructor(props) {
    super(props);
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.myRef = React.createRef();
    this.state.img = this.getNewPokemonImage();
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
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
          <img ref={this.myRef} src={this.state.img} style={{ filter: "contrast(0%) brightness(50%)" }} className="shadowImage" />
        </div>
        <DefaultButton text="Reveal" onClick={this.revealPokemon} color="white"></DefaultButton>
        {!this.state.revealed && <TextField label="Guess!" onChange={this.handleChange} value={this.state.guess} className="button" />}
        { this.state.revealed &&
          <div>
            <p> It's {pokemonNames[this.pokemonNumber]}
            </p>
            <p>
              Next Pokemon in {this.state.time.s}
            </p>
          </div>
        }
      </div>);
  }

  handleChange = (event) => {
    this.setState({ guess: event.target.value });
    if (event.target.value.toLowerCase() === pokemonNames[this.pokemonNumber].toLowerCase()) {
      this.revealPokemon();
      this.setState({ guess: '' })
    }
  }

  getRandomPokemon = () => {
    console.log(this.state.currentPokemonNumbers, "nums");
    const randomPN = this.state.currentPokemonNumbers[Math.floor(Math.random() * this.state.currentPokemonNumbers.length)];
    return randomPN;
  }

  getNewPokemonImage = () => {
    const pokemonNumber = this.getRandomPokemon().toString();
    const img = images('./' + pokemonNumber + '.png');
    this.pokemonNumber = pokemonNumber;
    return img;
  }

  revealPokemon = () => {
    this.myRef.current.style.filter = null;
    this.setState({ revealed: true });
    this.startTimer();
  }

  hidePokemon = () => {
    this.myRef.current.style.filter = "contrast(0%) brightness(50%)";
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    if (!this.state.revealed) {
      return;
    }
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
      this.setState({ revealed: false });
      const img = this.getNewPokemonImage();
      this.hidePokemon();
      this.setState({
        img: img,
        time: this.secondsToTime(3),
        seconds: 3,
      });
      this.timer = 0;
      this.startTimer();
    }
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }
}

export default Game;