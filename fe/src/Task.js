import React, { Component } from 'react';
import axios from 'axios';
import './Task.css'

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

    Promise.all([ habiticaMain.get(), habiticaTasks.get() ])
      .then(responses => this.setState({
        habMainData: responses[0],
        habTaskData: responses[1]
      }))

      .catch(error => console.log(error))

  }

  componentDidUpdate(prevProps, prevState) {

    let dailiesArray = []
    let todosArray = []
    let habitsArray = []

    const setThoseStates = () => {
      if(prevState.habTaskData !== this.state.habTaskData) {
        this.setState({
          dailies: dailiesArray,
          todos: todosArray,
          habits: habitsArray
        })
      }
    }

    const pushIntoArrays = () => {
      this.state.habTaskData.data.data.map(task => {
        if(task.type === "daily") {
          dailiesArray.push(task)
        } else if(task.type === "todo") {
          todosArray.push(task)
        } else if (task.type === "habit") {
          habitsArray.push(task)
        }
      })
      setThoseStates()
    }

    pushIntoArrays()
  }

    render () {

      if(this.state.habTaskData === []) {
        return <h1>Please Wait</h1>
      } else {
        const { dailies, todos, habits } = this.state

        return (
          <div className="grid-container">
            <div className="dailies">
              {dailies.map(job =>
                <li key={job.id}>{job.type}:{job.text} - Completed? {String(job.completed)}</li>
              )}
            </div>
            <div className="todos">
              {todos.map(job =>
                <li key={job.id}>{job.type}:{job.text} - Completed? {String(job.completed)}</li>
              )}
            </div>
            <div className="habits">
              {habits.map(job =>
                <li key={job.id}>{job.type}:{job.text} - Completed? {String(job.completed)}</li>
              )}
            </div>
          </div>
        )
}}}

export default Task