import React, {Component} from 'react'
import {TopBar, MapView} from './components'
import logo from './logo.svg'

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
        <header className="App-header">
          {/* <MapView /> */}
          <MapView
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            //AIzaSyDlDDOFcLe3m6SlveVfAS7dARz1ZDeNN8o
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
