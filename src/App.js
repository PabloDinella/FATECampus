import React, {Component} from 'react'
import {Router, Route} from 'react-router-dom'
import configureHistory from './support/configureHistory.js'
import {HomeView, AboutView} from './views'

const history = configureHistory()

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={HomeView} />
          <Route path="/about" component={AboutView} />
        </div>
      </Router>
    );
  }
}

export default App
