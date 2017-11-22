import React from 'react'

import withStyles from '../support/withStyles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import SearchIcon from 'material-ui-icons/Search'

const styles = theme => ({
  root: {
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  searchInputContainer: {
    '& input': {
      height: '30px',
      border: 0,
      padding: '8px',
      boxSizing: 'border-box',
      color: '#fff',
      background: 'rgba(255, 255, 255, 0.1)',
    },
  },
})

export const TopBar = ({classes, onSearch}) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            Campus <small>FATEC-SP</small>
          </Typography>
          <div className={classes.searchInputContainer}>
            <input type="text" onChange={(event) => {onSearch(event.target.value)}} />
          </div>
          <IconButton color="contrast">
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles('TopBar', styles, TopBar)
