import React, {Component} from 'react'
import _ from 'lodash'
import overlayImage from '../assets/map-overlay.png'
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, GroundOverlay} from "react-google-maps"

import placeMarkerIcon from '../assets/placeMarker.svg'

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

  componentWillReceiveProps(nextProps) {
    const {panToCoords} = nextProps
    const {defaultCenter} = this.props
    if (_.isEmpty(panToCoords) || _.isEqual(panToCoords, defaultCenter)) return
    this.refs.map.panTo(panToCoords)
    this.setState({zoom: 19})
  }

  render() {
    const {defaultCenter, isMarkerShown, infoWindow, onMarkerClick} = this.props
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
          {places.map(marker => <Marker
              key={marker.ref}
              position={marker.coords}
              // onClick={() => {this.infoWindowToggle(marker.ref); }}
              onClick={() => {onMarkerClick({ref: marker.ref, title: marker.name, description: marker.description})}}
              icon={placeMarkerIcon}
            >
            {(infoWindow.open && infoWindow.id === marker.ref)
              && <InfoWindow>
                <div>
                  <h3>{infoWindow.title}</h3>
                  <h4>{infoWindow.subtitle}</h4>
                  <p>{infoWindow.description}</p>
                </div>
              </InfoWindow>}
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
