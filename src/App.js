import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import Login from './components/Login';
class App extends Component {

  constructor() {
    super()
    this.state = {
      lat: 0,
      lng: 0,
      zoom: 13
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
  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div>
        <Login />
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br/> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default App;
