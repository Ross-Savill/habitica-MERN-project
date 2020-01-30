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
          this.state = { habMainData: '',
          habTaskData: '',
          dailies: [],
          todos: [],
          habits: []}
        }

  componentDidMount() {

    Promise.all([ habiticaMain.get(), habiticaTasks.get() ])
      .then(responses => this.setState({
        habMainData: responses[0],
        habTaskData: responses[1] }))
      .catch(error => console.log(error))
  }

  render () {
    const updateStats = () => {
      // console.log(this.state.taskData)

    const data = this.state.taskData.data
    data.forEach((task) => {
      if(task.type === "dailies") {
        this.setState({ dailies: this.state.dailies.concat(task)})
      } else if(task.type === "todo") {
        this.setState({ todos: this.state.todos.concat(task)})
      } else if (task.type === "habit") {
        this.setState({ habits: this.state.habits.concat(task)})            }
    })
  }

  if(this.state.habTaskData = '') {
    return <button onClick={updateStats}>Click to update data</button>
  } else {
    const dailies = this.state.dailies
      return (
        <div>
          <ol>
            {dailies.map(job =>
              <li key={job.id}>{job.type}:{job.text} - Completed? {String(job.completed)}</li>
            )}
          </ol>
        </div>
    )
    }}}

export default Task