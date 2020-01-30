import React, { Component } from 'react';
import Task from './Task';
import axios from 'axios';

const apiPath = axios.create({
  baseURL: 'http://localhost:5000',

})

class App extends Component {

  handleUpdate = (e) => {
    apiPath.post('/rosshabitica',  )
  }

  render() {
    return (
      <div>
        <Task />
      </div>
    )
  }
}

export default App;
