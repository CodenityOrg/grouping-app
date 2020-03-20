import React from 'react';
import { Map, TileLayer, Circle, Marker, Popup } from 'react-leaflet'
const RANGES = ["green", "yellow", "red"];

export default (props) => {
    const {spots, position, isLogged, openSpotRegister} = props;
    const spotsView = spots.map((spot) =>
        <div>
            <Marker position={[spot.latitude, spot.longitude]} >
                <Popup>Nombre: {spot.name}</Popup>
            </Marker>
            <Circle center={[spot.latitude, spot.longitude]} fillColor={RANGES[spot.average]} color={RANGES[spot.average]} weight={2} radius={15} />
        </div>
    );

    return (
        <Map
            center={position}
            onClick={isLogged && openSpotRegister}
            zoom={18}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            {spotsView}
        </Map>
    )
}