import React, { Component } from 'react';
import Task from './Task';
import axios from 'axios';

class App extends Component {

  handleClick = (e) => {

  }

  render() {
    return (
      <div>
        <Task updateStats={this.handleUpdate} />
      </div>
    )
  }
}

export default App;
