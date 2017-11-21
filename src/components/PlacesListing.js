import React, {Component} from 'react'
import markers from '../data/places.json'
import _ from 'lodash';

import withStyles from '../support/withStyles';

import List, {ListSubheader, ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
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

  componentDidUpdate() {
    console.log(this.state);
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
    const {classes} = this.props

    return <List>
      {markers.map(({marker}) => {
        const key = `${marker.ref}`
        const collapsed = this.state.uncollapsedBuilding === key
        return [<ListItem key={key} button onClick={() => {this.toggleBuildingCollapse(key)}}>
          <ListItemIcon><PlaceIcon /></ListItemIcon>
          <ListItemText inset primary={marker.name} />
        </ListItem>,
        <Collapse in={collapsed} key={`${marker.ref}_sub`} transitionDuration="auto" unmountOnExit>
          {marker.floors.map(({label, places}, index) => {
            const key = `${marker.ref}-${index}`
            return [<ListItem key={key} button className={classes.nested1} onClick={() =>{this.toggleFloorCollapse(key)}}>
              <ListItemIcon><LayersIcon /></ListItemIcon>
              <ListItemText inset primary={label} />
              {collapsed ? <ExpandLess /> : <ExpandMore />}
            </ListItem>,
            <Collapse in={this.state.uncollapsedFloor === key}>
              {places.map(({name}) => <ListItem key={`${marker.ref}_${index}_${name}`} button className={classes.nested2}>
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
