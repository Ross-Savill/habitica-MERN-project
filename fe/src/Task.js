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
          this.state = { mainData: '', taskData: '', dailies: [], todos: [], habits: []}
        }

  componentDidMount() {

    habiticaMain.get()
    .then(resp => this.setState({ mainData: resp }) )
    .catch(error => console.log(error))

    habiticaTasks.get()
      .then(resp => console.log(resp))
      .then(resp => this.setState({ taskData: resp })
      // .then(console.log(this.state.taskData)))
      .catch(error => console.log(error))
    )


  }

  render () {
    // console.log(this.state.taskData.data)
    const updateStats = () => {

    const data = this.state.taskData
    data.forEach((task) => {
      if(task.type === "dailies") {
        this.setState({ dailies: this.state.dailies.concat(task)})
      } else if(task.type === "todo") {
        this.setState({ todos: this.state.todos.concat(task)})
      } else if (task.type === "habit") {
        this.setState({ habits: this.state.habits.concat(task)})            }
    })
    console.log(data)
  }

  if(this.state.taskData = []) {
    return <button onClick={updateStats}>Click to update data</button>
  } else {
    console.log(this.state)
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