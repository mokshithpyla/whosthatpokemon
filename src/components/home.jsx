import React, { Component } from 'react';
import whodat from '../images/whodat.png';
import { DefaultButton } from 'office-ui-fabric-react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';


class Home extends Component {
  
  render() {
    return (
      <div>
        {/* <img src={whodat} width="640" height="480" /> */}
        <br />
          <Link to="/game"> <DefaultButton text="Start Guessing!" /> </Link>
      </div>
    );
  }
}

export default Home;