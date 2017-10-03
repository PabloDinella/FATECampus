import React, { Component } from 'react'

import withStyles from '../support/withStyles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
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
})

export const TopBar = ({classes}) => {
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
          <IconButton color="contrast">
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles('TopBar', styles, TopBar)
