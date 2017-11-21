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
      uncollapsed: null
    }
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  toggleCollapse(ref) {
    if (!ref) return
    const {uncollapsed} = this.state
    this.setState({uncollapsed: ref !== uncollapsed ? ref : null})
  }

  render() {
    const {classes} = this.props

    return <List>
      {markers.map(({marker}) => {
        return [<ListItem key={marker.ref} button onClick={() => {this.toggleCollapse(`${marker.ref}_sub`)}}>
          <ListItemIcon>
            <PlaceIcon />
          </ListItemIcon>
          <ListItemText inset primary={marker.name} />
          <ExpandMore />
          {/* {!!floors && <ul>
            {floors.map(({label, places}) => <ul>
              <li>{label}</li>
              <ul>{places.map(place => <li>{place.name}</li>)}</ul>
            </ul>)}
          </ul>} */}
        </ListItem>,
        <Collapse in={this.state.uncollapsed === `${marker.ref}_sub`} key={`${marker.ref}_sub`} transitionDuration="auto" unmountOnExit>
          {marker.floors.map(({label, places}, index) => {
            return [<ListItem key={`${marker.ref}_${index}`} button className={classes.nested1}>
              <ListItemIcon><LayersIcon /></ListItemIcon>
              <ListItemText inset primary={label} />
              <ExpandMore />
            </ListItem>,
            <Collapse>
              {places.map(({name}) => <ListItem key={`${marker.ref}_${index}_${name}`} button className={classes.nested2}>
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
