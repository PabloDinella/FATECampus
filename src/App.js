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
        subtitle: null,
        description: null,
        open: false
      },
      searchQuery: null,
    }
  }

  onBuildingSelect(coords) {
    this.setState({panToCoords: coords})
  }

  infoWindowUpdate = (newState) => {
    this.setState({infoWindow: newState})
  }

  infoWindowToggle = ({ref, title, subtitle, description}) => {
    const {infoWindow, infoWindow: {id, open}} = this.state
    const newInfoWindow = {id: ref, title, subtitle, description, open: true}

    if (_.isEqual(infoWindow, newInfoWindow)) {
      newInfoWindow.open = !open
    }

    this.setState({infoWindow: newInfoWindow})
  }

  onSearch = (term) => {
    this.setState({searchQuery: term})
  }


  render() {
    const {infoWindow, searchQuery} = this.state

    return (
      <div className="App">
        <TopBar onSearch={this.onSearch} />
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
        <PlacesListing
          onBuildingSelect={(coords, marker) => {this.onBuildingSelect(coords), this.infoWindowToggle({ref: marker.ref, title: marker.name, description: marker.description})}}
          onFloorSelect={(marker) => this.infoWindowToggle({ref: marker.ref, title: marker.name, subtitle: marker.subtitle, description: marker.description})}
          onPlaceSelect={(marker) => this.infoWindowToggle({ref: marker.ref, title: marker.name, subtitle: marker.subtitle, description: marker.description})}
          searchQuery={searchQuery}
        />
      </div>
    )
  }
}

export default App
