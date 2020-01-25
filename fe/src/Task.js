import React, { Component } from 'react';
import axios from 'axios';

const habiticaMain = axios.create({
  baseURL: 'https://habitica.com/export/userdata.json',
  headers: {
    'x-api-user' : process.env.REACT_APP_HABITICA_USER_ID,
    'x-api-key' : process.env.REACT_APP_HABITICA_API_TOKEN
  }
})

const habiticaTasks = axios.create({
  baseURL: 'https://habitica.com/api/v3/tasks/user',
  headers: {
    'x-api-user' : process.env.REACT_APP_HABITICA_USER_ID,
    'x-api-key' : process.env.REACT_APP_HABITICA_API_TOKEN
  }
})

class Task extends Component {

     componentDidMount() {
        habiticaMain.get()
        .then(resp => console.log(resp.data))
        .then(json => axios.post)
        .catch(error => console.log(error))

      habiticaTasks.get()
          .then(resp => console.log(resp.data))
          .catch(error => console.log(error))
      }

  render () {
      const tasks = window.document
      console.log(tasks)
      return (
        <div>
        <button onClick={this.props.updateStats}>Click to update data</button>
        </div>
    )
}
}

export default Task