import React from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps';

function Map() {
    return (<GoogleMap defaultZoom={10} defaultCenter={{lat: 10, lng: 12}}/>);
}

const wrapper = withScriptjs(withGoogleMap(Map));

export default function renderMap() {
    return (
        <div style={{width: '100px', height: '100px'}}>
            <wrapper googleMapuRL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDGD7_VrYPlO5F-qYuZSo_KSNAjHWev2Tg`}
            loadingElement = {<div style = {{ height: "100%" }} />}
            containerElement = {<div style ={{ height: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            />
            
        </div>
    )
}