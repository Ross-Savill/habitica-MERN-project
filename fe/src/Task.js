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
          this.state = {
          habMainData: [],
          habTaskData: [],
          dailies: [],
          todos: [],
          habits: []}
        }

  componentDidMount() {

    let dailiesArray = []
    let todosArray = []
    let habitsArray = []

    Promise.all([ habiticaMain.get(), habiticaTasks.get() ])
      .then( responses => this.setState({
        habMainData: responses[0],
        habTaskData: responses[1]}, () =>
        this.state.habTaskData.data.data.map(task => {
            if(task.type === "daily") {
              dailiesArray.push(task)
            } else if(task.type === "todo") {
              todosArray.push(task)
            } else if (task.type === "habit") {
              habitsArray.push(task)
            }})
      .then(this.setState({ dailies: dailiesArray,
                            todos: todosArray,
                            habits: habitsArray }))
      .catch(error => console.log(error))
    }

    render () {

      if(this.state.habTaskData === '') {
        return <h1>Please Wait</h1>
        } else {

        const { dailies, todos, habits } = this.state
          return (
            <div>
              <ol>
                {dailies.map(job =>
                  <li key={job.id}>{job.type}:{job.text} - Completed? {String(job.completed)}</li>
                )}
                {todos.map(job =>
                  <li key={job.id}>{job.type}:{job.text} - Completed? {String(job.completed)}</li>
                )}
                {habits.map(job =>
                  <li key={job.id}>{job.type}:{job.text} - Completed? {String(job.completed)}</li>
                )}
              </ol>
            </div>
        )
}}}

export default Task