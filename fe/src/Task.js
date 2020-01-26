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
  constructor(props) {
      super(props)
          this.state = {}
          // console.log(props)
}

  componentDidMount() {

    habiticaMain.get()
      .then(resp => resp.data)
      .then(resp => this.setState({ mainData: resp }) )
      .catch(error => console.log(error))

    habiticaTasks.get()
      .then(resp => resp.data)
      .then(resp => this.setState({ taskData: resp }) )
      .catch(error => console.log(error))

  }

  render () {
      setTimeout(console.log(this.state.taskData.data), 3000)
      // const { data } = taskData
      return (
        <div>

        <button onClick={this.props.updateStats}>Click to update data</button>
        </div>
    )
}
}

export default Task