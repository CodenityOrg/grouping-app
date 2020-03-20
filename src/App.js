import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Map, TileLayer, Circle } from 'react-leaflet'
import Login from './components/Login';
import SpotRegister from './components/SpotRegister';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

import spotDS from './api/spots';

const RANGES = ["green", "yellow", "red"];

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props)
    const { cookies } = props;

    this.state = {
      lat: 0,
      lng: 0,
      zoom: 18,
      showRegisterSpot: false,
      showLogin: !cookies.get('token'),
      currentLoc: {
        lat: 0,
        lng: 0
      },
      spots: [],
      token: cookies.get('token') || ''
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

  componentDidMount = async () => {
    const spots = await spotDS.get();
    this.setState({
      spots
    });
    this.getLocation();
  }

  openSpotRegisterHandler = (e) => {
    this.setState({
      show: true,
      currentLoc: {
        lat: e.latlng.lat,
        lng: e.latlng.lng
      }
    });
  }

  closeSpotRegisterHandler = () => {
    this.setState({
      show: false
    })
  }

  closeLoginHandler = () => {
    this.setState({
      showLogin: false
    })
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const spotsView = this.state.spots.map((spot) => {
      return <Circle center={[spot.latitude, spot.longitude]} fillColor={RANGES[spot.average]} color={RANGES[spot.average]} weight={2} radius={20} />
    });

    return (
      <div>
        <Login 
          show={this.state.showLogin} 
          onClose={this.closeLoginHandler}
        />
        <SpotRegister
          show={this.state.show}
          currentLoc={this.state.currentLoc}
          onClose={this.closeSpotRegisterHandler}
        />
        <Map
          center={position}
          onClick={this.openSpotRegisterHandler}
          zoom={this.state.zoom}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {spotsView}
        </Map>
      </div>
    );
  }
}

export default withCookies(App);
