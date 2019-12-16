import React, { Component } from 'react';
import mapStyles from './MapStyles';


import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <Map initialCenter={{
        lat: 38.7881531,
        lng: -9.1124146
      }}
        defaultOptions={{ styles: mapStyles }}
        defaultZoom={10}
        google={this.props.google}
        onClick={this.onMapClicked}>


        <Marker
          onClick={this.onMarkerClick}
          title={'Beta-I'}
          name={'Beta-I'}
          position={{ lat: 38.7881531, lng: -9.1124146 }} />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBr1pVA3qkMszfSNm2lMcpR4TbikezP4uE')
})(MapContainer)
