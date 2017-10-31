import React, {Component} from 'react'
import {TopBar, MapView} from './components'
import logo from './logo.svg'

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
        <header className="App-header">
          <MapView />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
