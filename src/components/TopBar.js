import React, {Component} from 'react'

import withStyles from '../support/withStyles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'
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
    width: '100%',
    '& input': {
      height: '30px',
      width: '100%',
      border: 0,
      padding: '8px',
      boxSizing: 'border-box',
      color: '#fff',
      background: 'rgba(255, 255, 255, 0.1)',
    },
  },
})

class TopBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchOpen: null,
    }
  }

  searchToggle = () => {
    this.setState({searchOpen: !this.state.searchOpen})
  }

  render() {
    const {classes, onSearch, history} = this.props
    const {searchOpen} = this.state
    const {searchToggle} = this

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {searchOpen && <IconButton className={classes.menuButton} color="contrast" aria-label="Voltar" onClick={searchToggle}>
              <ArrowBackIcon />
            </IconButton>}
            {!searchOpen && <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>}
            {!searchOpen && <Typography type="title" color="inherit" className={classes.flex} onClick={() => {history.push('/')}}>
              Campus <small>FATEC-SP</small>
            </Typography>}
            {searchOpen && <div className={classes.searchInputContainer}>
              <input type="text" onChange={(event) => {onSearch(event.target.value)}} />
            </div>}
            <IconButton color="contrast" onClick={searchToggle}>
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles('TopBar', styles, TopBar)
