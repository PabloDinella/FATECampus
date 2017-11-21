import React, {Component} from 'react'
import {TopBar, MapView, PlacesListing} from './components'
import logo from './logo.svg'

class App extends Component {
  constructor() {
    super()
    this.state = {
      panToCoords: null
    }
  }

  onPlaceSelect(coords) {
    this.setState({panToCoords: coords})
  }

  render() {

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
          />
        </header>
        <PlacesListing onPlaceSelect={(coords) => {console.log('olha deu');this.onPlaceSelect(coords)}} />
      </div>
    )
  }
}

export default App
