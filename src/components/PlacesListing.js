import React, {Component} from 'react'
import markers from '../data/places.json'
import _ from 'lodash';

import withStyles from '../support/withStyles';

import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import PlaceIcon from 'material-ui-icons/Place';
import LayersIcon from 'material-ui-icons/Layers';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import LabelIcon from 'material-ui-icons/Label';

const styles = theme => ({
  nested1: {
    paddingLeft: theme.spacing.unit * 4,
  },
  nested2: {
    paddingLeft: theme.spacing.unit * 8,
  },
});

class PlacesListing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uncollapsedBuilding: null,
      uncollapsedFloor: null
    }
  }

  toggleBuildingCollapse(ref) {
    if (!ref) return
    const {uncollapsedBuilding} = this.state
    this.setState({uncollapsedBuilding: ref !== uncollapsedBuilding ? ref : null})
  }

  toggleFloorCollapse(ref) {
    if (!ref) return
    const {uncollapsedFloor} = this.state
    this.setState({uncollapsedFloor: ref !== uncollapsedFloor ? ref : null})
  }

  render() {
    const {classes, onBuildingSelect, onFloorSelect, onPlaceSelect, searchQuery} = this.props

    const newMarkers = !searchQuery ? markers : markers.map(m => {
      const newFloors = m.floors.map(f => {
        const newPlaces = f.places.filter(p => p.name.includes(searchQuery))
        const newobj = _.clone(f)
        newobj.places = newPlaces
        return newobj
      }).filter(f => f.places.length !== 0)
      const newobj = _.clone(m)
      newobj.floors = newFloors
      return newobj
    }).filter(m => m.floors.filter(f => f.places.length !== 0).length !== 0)

    return <List>
      {newMarkers.map(marker => {
        const key = `${marker.ref}`
        const collapsed = this.state.uncollapsedBuilding === key
        return [<ListItem key={key} button onClick={() => {this.toggleBuildingCollapse(key); onBuildingSelect(marker.coords, marker);}}>
          <ListItemIcon><PlaceIcon /></ListItemIcon>
          <ListItemText inset primary={marker.name} />
        </ListItem>,
        <Collapse in={searchQuery || collapsed} key={`${key}_sub`} transitionDuration="auto" unmountOnExit>
          {marker.floors.map(({label, places}, index) => {
            const key = `${marker.ref}-${index}`
            const collapsed = this.state.uncollapsedFloor === key
            return [<ListItem key={key} button className={classes.nested1} onClick={() =>{this.toggleFloorCollapse(key); onFloorSelect(_.merge(marker, {subtitle: label})); }}>
              <ListItemIcon><LayersIcon /></ListItemIcon>
              <ListItemText inset primary={label} />
              {collapsed ? <ExpandLess /> : <ExpandMore />}
            </ListItem>,
            <Collapse in={searchQuery || collapsed} key={`${key}_sub`}>
              {places.map(({name}) => <ListItem key={`${marker.ref}_${index}_${name}`} button className={classes.nested2} onClick={() => {onPlaceSelect(_.merge(marker, {subtitle: name, description: 'desccccc'}))}}>
                <ListItemIcon><LabelIcon /></ListItemIcon>
                <ListItemText inset primary={name} />
              </ListItem>)}
            </Collapse>]
          })}
        </Collapse>]
      })}
    </List>
  }
}

export default withStyles('PlacesListing', styles, PlacesListing)
