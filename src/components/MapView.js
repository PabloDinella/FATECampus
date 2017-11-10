import React, {Component} from 'react'
import overlayImage from '../assets/map-overlay.png'
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, GroundOverlay} from "react-google-maps"

import places from '../data/places.json'

import withStyles from '../support/withStyles'

class MapView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openInfoWindow: false
    }
  }

  infoWindowOpen(ref) {
    this.setState({openInfoWindow: ref})
  }

  render() {
    const {props} = this

    return <GoogleMap
      defaultZoom={18}
      defaultCenter={{lat: -23.529528, lng: -46.632384}}
    >
      {props.isMarkerShown &&
        <div>
          {places.map(({marker}) => <Marker
              key={marker.ref}
              position={marker.coords}
              onClick={() => this.infoWindowOpen(marker.ref)}
            >
            {this.state.openInfoWindow === marker.ref && <InfoWindow><div>oioi</div></InfoWindow>}
          </Marker>)}
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
