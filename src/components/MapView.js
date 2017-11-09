import React, {Component} from 'react'
import overlayImage from '../assets/map-overlay.png'
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, GroundOverlay} from "react-google-maps"

import withStyles from '../support/withStyles'

class MapView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      infoOpen: true,
    }
  }

  render() {
    const {props} = this

    return <GoogleMap
      defaultZoom={18}
      defaultCenter={{lat: -23.529528, lng: -46.632384}}
    >
      {props.isMarkerShown &&
        <div>
          <Marker position={{lat: -23.529591, lng: -46.632572}}>
            {this.state.infoOpen && <InfoWindow><div>Informações, horário de funcionamento...</div></InfoWindow>}
          </Marker>
          <Marker position={{lat: -23.530062, lng: -46.632454}} />
          <Marker position={{lat: -23.529217, lng: -46.632480}} />
          <Marker position={{lat: -23.529984, lng: -46.632901}} />
          <Marker position={{lat: -23.529700, lng: -46.633123}} />
          <Marker position={{lat: -23.528934, lng: -46.632990}} />
          <Marker position={{lat: -23.529008, lng: -46.632791}} />
        </div>
      }
      <GroundOverlay
        defaultUrl={overlayImage}
        defaultBounds={new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(-23.530292, -46.633573),
          new window.google.maps.LatLng(-23.528390, -46.631799)
        )}
      />
    </GoogleMap>
  }
}

// const MapView = withScriptjs(withGoogleMap((props) =>
//
// ))

export default withScriptjs(withGoogleMap(MapView))
