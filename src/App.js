import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Map, TileLayer, Circle } from 'react-leaflet'
import Login from './components/Login';
import SpotRegister from './components/SpotRegister';


const RANGES = {
  "0": "empty",
  "25": "average",
  "50": "full"
};

class App extends Component {

  constructor() {
    super()
    this.state = {
      lat: 0,
      lng: 0,
      zoom: 18,
      show: false
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

  componentDidMount = () => {
    this.getLocation();
  }

  openSpotRegisterHandler = () => {
    this.setState({
      show: true
    })
  }

  closeSpotRegisterHandler = () => {
    this.setState({
      show: false
    })
  }

  render() {
    const position = [this.state.lat, this.state.lng];


    const spotsView = [1].map((count) => {
      return <Circle center={position} fillColor="blue" radius={25} />
    })

    return (
      <div>
        <Login />
        <SpotRegister 
          show={this.state.show} 
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

export default App;
