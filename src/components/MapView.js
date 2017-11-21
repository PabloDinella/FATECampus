import React, {Component} from 'react'
import _ from 'lodash'
import overlayImage from '../assets/map-overlay.png'
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, GroundOverlay} from "react-google-maps"

import places from '../data/places.json'

import withStyles from '../support/withStyles'

class MapView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openInfoWindow: false,
      zoom: null
    }
  }

  shouldComponentUpdate(nextProps) {
    const {defaultCenter} = this.props
    const {panToCoords} = nextProps
    console.log(defaultCenter, panToCoords);
    return !_.isEmpty(panToCoords) && !_.isEqual(panToCoords, defaultCenter)
  }

  componentWillReceiveProps(nextProps) {
    const {panToCoords} = nextProps
    console.log(panToCoords);
    this.refs.map.panTo(panToCoords)
    this.setState({zoom: 19})
  }

  componentDidMount() {
    console.log(this.refs.map);
  }

  infoWindowOpen(ref) {
    this.setState({openInfoWindow: ref})
  }

  render() {
    const {defaultCenter, isMarkerShown} = this.props
    const {zoom} = this.state

    return <GoogleMap
      ref="map"
      defaultZoom={18}
      defaultCenter={defaultCenter}
      options={{gestureHandling: 'greedy'}}
      zoom={zoom ? zoom : 18}
    >
      {isMarkerShown &&
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
