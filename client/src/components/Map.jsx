import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

export class renderMap extends Component {
    render() {
        return (
            <Map
              google={this.props.google}
              zoom={8}
              style={mapStyles}
              initialCenter={{ lat: 47.444, lng: -122.176}}
            />
        );
      }
}

export default GoogleApiWrapper({
    apiKey: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBr1pVA3qkMszfSNm2lMcpR4TbikezP4uE'
  })(renderMap);

  const mapStyles = {
    width: '100%',
    height: '100%',
  };
