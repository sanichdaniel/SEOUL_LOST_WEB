import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class GoogleMapPage extends Component {
  render() {
    const points = [
      { lat: 35.02, lng: 127.01 },
      { lat: 35.03, lng: 127.02 },
      { lat: 35.03, lng: 127.04 },
      { lat: 35.05, lng: 127.02 },
    ];
    const bounds = new this.props.google.maps.LatLngBounds();
    for (let i = 0; i < points.length; i= i + 1) {
      bounds.extend(points[i]);
    }
    return (
      <Map
        google={this.props.google} zoom={14}
        initialCenter={{
          lat: 37.50676,
          lng: 127.00245,
        }}
        bounds={bounds}
      >

        <Marker
          onClick={this.onMarkerClick}
          name={'Current location'}
        />

        <InfoWindow onClose={this.onInfoWindowClose} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyA8vrUVB9L-FZNW3VJB2ybhdP8_FKz5d1w'),
})(GoogleMapPage);
