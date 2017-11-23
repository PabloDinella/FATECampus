import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {HomeView, AboutView} from './views'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={HomeView} />
          <Route path="/about" component={AboutView} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App
