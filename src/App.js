import React, {Component} from 'react'
import _ from 'lodash'
import {TopBar, MapView, PlacesListing} from './components'
import logo from './logo.svg'

function teste() {
  const input = [
    {
      value: 'Miss1',
      children: [
        { value: 'Miss2' },
        { value: 'Hit1', children: [ { value: 'Miss3' } ] }
      ]
    },
    {
      value: 'Miss4',
      children: [
        { value: 'Miss5' },
        { value: 'Miss6', children: [ { value: 'Hit2' } ] }
      ]
    },
    {
      value: 'Miss7',
      children: [
        { value: 'Miss8' },
        { value: 'Miss9', children: [ { value: 'Miss10' } ] }
      ]
    },
    {
      value: 'Hit3',
      children: [
        { value: 'Miss11' },
        { value: 'Miss12', children: [ { value: 'Miss13' } ] }
      ]
    },
    {
      value: 'Miss14',
      children: [
        { value: 'Hit4' },
        { value: 'Miss15', children: [ { value: 'Miss16' } ] }
      ]
    },
  ];

  var res = input.filter(function f(o) {
    if (o.value.includes("Hit")) return true

    if (o.children) {
      return (o.children = o.children.filter(f)).length
    }
  })
  console.log(JSON.stringify(res, null, 2))

}

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
      }
    }
    teste()
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
        <PlacesListing
          onBuildingSelect={(coords, marker) => {this.onBuildingSelect(coords), this.infoWindowToggle({ref: marker.ref, title: marker.name, description: marker.description})}}
          onFloorSelect={(marker) => this.infoWindowToggle({ref: marker.ref, title: marker.name, subtitle: marker.subtitle, description: marker.description})}
          onPlaceSelect={(marker) => this.infoWindowToggle({ref: marker.ref, title: marker.name, subtitle: marker.subtitle, description: marker.description})}
        />
      </div>
    )
  }
}

export default App
