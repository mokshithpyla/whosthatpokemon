import { DefaultButton, TextField } from '@fluentui/react';
import { initializeIcons } from '@uifabric/icons';
import React, { Component } from 'react';
import pokemonNames from '../script';
import { Icon } from '@fluentui/react/lib/Icon';
import '../App.css';
const maskFormat = {
  '*': /[a-zA-Z0-9_]/,
};

initializeIcons();

const images = require.context('../images/pokemon', true);

const CheckIcon = () => <Icon iconName="SkypeCircleCheck" className="check-green" />;
const SeenIcon = () => <Icon iconName="View" className="view-blue" />;

class Game extends Component {
  state = {
    revealed: false,
    endOfGame: false,
    currentPokemonNumbers: Array.from({ length: 151 }, (_, i) => i + 1),
    time: {},
    seconds: 5,
    img: null,
    guess: '',
    streak: 0,
    hstreak: 0,
    score: 0,
    pokemonNumber: 0
  }

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
  constructor(props) {
    super(props);
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.myRef = React.createRef();
    this.state.pokemonNumber = this.getRandomPokemon(this.state.currentPokemonNumbers);
    this.state.img = this.getNewPokemonImage();
    this.guessed = false;
    // this.state.currentPokemonNumbers.splice(this.state.pokemonNumber, 1);
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
          {/* <div className="score">
            <div className="score1 ml10">
              <span> Score </span>
            </div>
            <div className="score1 ml10">
            <span> Score </span>
            </div>
            <div className="score1 ml10">
            <span> Score </span>
            </div>
          </div> */}
          <div className="scoreboard ml10">
            <div className="ml10">
              <label className="f10"> Streak 🔥 </label>
              <table>
                <tbody>
                  <tr>
                    <th> ⚡</th>
                    <th> ✨ </th>
                  </tr>
                  <tr>
                    <td> {this.state.streak} </td>
                    <td> {this.state.hstreak} </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="ml10">
              <label className="f10">Score 💯 </label>
              <table>
                <tbody>
                  <tr>
                    <th> <CheckIcon />  </th>
                    <th> <SeenIcon />  </th>
                  </tr>
                  <tr>
                    <td> {this.state.score} </td>
                    <td> {151 - this.state.currentPokemonNumbers.length} </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        { !this.state.endOfGame &&
          <div>
            <div className="canvasContainer">
              <img ref={this.myRef} src={this.state.img} style={{ filter: "contrast(0%) brightness(0%)" }} className="shadowImage" />
            </div>
            <div>
              {!this.state.revealed && <DefaultButton text="Reveal" onClick={() => this.revealPokemon(true)} styles={this.buttonStyle}><SeenIcon /> </DefaultButton>}
              {!this.state.revealed && <TextField label="Guess!" onChange={this.handleChange} value={this.state.guess} className="button" style={{ textTransform: "capitalize" }} />}
              {this.state.revealed &&
                <div className="capitalize">
                  {this.guessed &&
                    <h2> Yes! <br></br>It's {pokemonNames[this.pokemonNumber]} <CheckIcon />
                    </h2>}
                  {!this.guessed &&
                    <h2> It's {pokemonNames[this.pokemonNumber]} <SeenIcon />
                    </h2>}
                  <h2>
                    Next Pokemon in {this.state.time.s}
                  </h2>
                </div>
              }
            </div>
          </div>
        }
        { this.state.endOfGame &&
          <div className="canvasContainer">
            <p>
              Out of pokemon!
            </p>
            <p>
              You guessed {this.state.score} out of 151 Pokémons!
            </p>
            <DefaultButton text="Play Again?" onClick={this.reset}></DefaultButton>
          </div>
        }
      </div>);
  }

  reset = () => {
    this.setState({ endOfGame: false, currentPokemonNumbers: Array.from({ length: 2 }, (_, i) => i + 1) });
    this.startTimer();
  }

  handleChange = (event) => {
    this.setState({ guess: event.target.value });
    if (event.target.value.toLowerCase() === pokemonNames[this.pokemonNumber].toLowerCase()) {
      this.guessed = true;
      this.revealPokemon();
      if (this.state.hstreak === this.state.streak) {
        this.setState({ hstreak: this.state.hstreak + 1 });
      }
      this.setState({ guess: '', streak: this.state.streak + 1, score: this.state.score + 1 });
    }
  }

  getRandomPokemon = (pokemons) => {
    const randomPN = pokemons[Math.floor(Math.random() * pokemons.length)];
    return randomPN;
  }

  getNewPokemonImage = () => {
    const img = images('./' + this.state.pokemonNumber + '.png');
    this.pokemonNumber = this.state.pokemonNumber;
    return img;
  }

  revealPokemon = (reset = false) => {
    this.myRef.current.style.filter = null;
    if (this.state.currentPokemonNumbers.length === 1) {
      this.setState({ endOfGame: true });
      return;
    }
    if (reset) {
      this.setState({ streak: 0 });
    }
    console.log(this.state.currentPokemonNumbers.length, 'lenght', this.state.pokemonNumber, 'pokemon');
    const x = this.state.currentPokemonNumbers.filter(n => n !== this.state.pokemonNumber);
    this.setState({ currentPokemonNumbers: x });
    const randomPN = this.getRandomPokemon(x);
    console.log(this.state.currentPokemonNumbers.length, 'lenght');
    console.log(this.state.currentPokemonNumbers);
    this.setState({ revealed: true, guess: '', pokemonNumber: randomPN });
    this.startTimer();
  }

  hidePokemon = () => {
    this.myRef.current.style.filter = "contrast(0%) brightness(0%)";
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
    if (seconds === 0) {
      clearInterval(this.timer);
      const img = this.getNewPokemonImage();
      this.hidePokemon();
      this.setState({
        img: img,
        time: this.secondsToTime(5),
        revealed: false,
        seconds: 5,
      });
      this.timer = 0;
      this.startTimer();
      this.guessed = false;
    }
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }
}

export default Game;