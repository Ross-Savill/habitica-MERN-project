import React, { Component } from 'react';
import axios from 'axios';

const habiticaRequest = axios.create({
  baseURL: 'https://habitica.com/export/userdata.json',
  headers: {
    'x-api-user' : process.env.REACT_APP_HABITICA_USER_ID,
    'x-api-key' : process.env.REACT_APP_HABITICA_API_TOKEN
  }
})

class App extends Component {
  componentDidMount() {
    habiticaRequest.get()
    .then(resp => console.log(resp.data))
    .catch(error => console.log(error))
  }
  render() {
    return (
      <div>
      </div>
    )
  }
}

export default App;
