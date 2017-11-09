import React from 'react'
import markers from '../data/places.json'

const PlacesListing = (props) => {
  console.log(markers);
  return <div>
    {markers.map(item => renderPlace(item.marker))}
  </div>
}

const renderPlace = (marker) => {
  return <ul>
    <li>{marker.name}</li>
    {marker.floors.map(floor => renderFloorListing(floor))}
  </ul>
}

const renderFloorListing = (floor) => {
  return <ul>
    <li>{floor.label}</li>
    <ul>
      {floor.places.map(place => renderSimpleList(place))}
    </ul>
  </ul>
}

const renderSimpleList = (place) => {
  return <li>{place.name}</li>
}

export default PlacesListing
