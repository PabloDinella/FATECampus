import React, {Component} from 'react'
import _ from 'lodash'
import {TopBar, MapView, PlacesListing} from './components'
import logo from './logo.svg'

class App extends Component {
  constructor() {
    super()
    this.state = {
      panToCoords: null,
      infoWindow: {
        id: null,
        title: null,
        description: null,
        open: false
      }
    }
  }

  componentDidUpdate() {

    console.log(this.state);
  }


  onPlaceSelect(coords) {
    this.setState({panToCoords: coords})
  }

  infoWindowUpdate = (newState) => {
    this.setState({infoWindow: newState})
  }

  infoWindowToggle = ({ref, title, description}) => {
    const {infoWindow, infoWindow: {id, open}} = this.state
    const newInfoWindow = {id: ref, title, description, open: true}

    if (_.isEqual(infoWindow, newInfoWindow)) {
      newInfoWindow.open = !open
    }

    this.setState({infoWindow: newInfoWindow})
  }


  render() {
    const {infoWindow} = this.state

    return (
      <div className="App">
        <TopBar />
        <header className="App-header">
          <MapView
            ref="map"
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            //AIzaSyDlDDOFcLe3m6SlveVfAS7dARz1ZDeNN8o
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            defaultCenter={{lat: -23.529528, lng: -46.632713}}
            panToCoords={this.state.panToCoords}
            infoWindow={infoWindow}
            onMarkerClick={this.infoWindowToggle}
          />
        </header>
        <PlacesListing onPlaceSelect={(coords, marker) => {this.onPlaceSelect(coords), this.infoWindowToggle({ref: marker.ref, title: marker.name, description: marker.description})}} />
      </div>
    )
  }
}

export default App
