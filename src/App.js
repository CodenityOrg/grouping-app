import React, { Component } from 'react';
import cookie from 'react-cookies'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
import SpotRegister from './components/SpotRegister';
import SpotsMap from './components/SpotsMap';

import spotDS from './api/spots';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      lat: 0,
      lng: 0,
      showSpotRegister: false,
      isLogged: !!cookie.load('token'),
      showLogin: false,
      currentLoc: {
        lat: 0,
        lng: 0
      },
      spots: [],
      token: cookie.load('token') || ''
    }
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.updatePosition);
    }
  }

  updatePosition = (position) => {
    this.setState({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }

  getSpots = async () => {
    const spots = await spotDS.get();
    this.setState({
      spots
    });
  }

  componentDidMount = async () => {
    this.getSpots();
    this.getLocation();
  }

  openSpotRegisterHandler = (e) => {
    this.setState({
      showSpotRegister: true,
      currentLoc: {
        lat: e.latlng.lat,
        lng: e.latlng.lng
      }
    });
  }

  closeSpotRegisterHandler = () => {
    this.setState({
      showSpotRegister: false
    });
  }

  closeLoginHandler = () => {
    this.setState({
      showLogin: false
    });
  }

  setToken = (token) => {
    this.setState({
      token,
      isLogged: true
    });
  }

  render() {
    const {showLogin, spots, isLogged, showSpotRegister, currentLoc} = this.state;
    const position = [this.state.lat, this.state.lng];

    return (
      <div>
        <Login
          show={showLogin || !isLogged}
          setToken={this.setToken}
          onClose={this.closeLoginHandler}
        />
        <SpotRegister
          show={showSpotRegister}
          currentLoc={currentLoc}
          getSpots={this.getSpots}
          onClose={this.closeSpotRegisterHandler}
        />
        <SpotsMap
          spots={spots}
          isLogged={isLogged}
          openSpotRegister={this.openSpotRegisterHandler}
          position={position}
        />
      </div>
    );
  }
}

export default App;
