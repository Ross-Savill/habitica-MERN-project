import React, { Component } from 'react';
import axios from 'axios';
import './Task.css'
import tick from'./tick_icon.svg'
import cross from './cross_icon.svg'

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
        task.completed ? task.completed = <img alt="completed" src={tick}></img> : task.completed = <img alt="Incomplete" src={cross}></img>
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
            <div className="header">
              <h1>Ross' Long List of Tasks!</h1>
            </div>
            <div className="dailies">
              <h2>Daily Tasks</h2>
              <div>
                <ol>
                  {dailies.map(job =>
                    <div key={job.id} className="dailiesListItem">
                      <li>{job.text}{job.completed}</li>
                    </div>
                  )}
                </ol>
              </div>
            </div>
            <div className="todos">
              <h2>To-do Tasks</h2>
                <div>
                <ol>
                  {todos.map(job =>
                    <div key={job.id} className="todosListItem">
                      <li>{job.text}{job.completed}</li>
                    </div>
                  )}
                </ol>
              </div>
            </div>
            <div className="habits">
            <h2>Habits to keep</h2>
              <div>
                <ol>
                {habits.map(job =>
                  <div key={job.id} className="habitsListItem">
                    <li>{job.text}</li>
                    <p>Completed? {String(job.completed)}</p>
                  </div>
                )}
                </ol>
              </div>
            </div>
          </div>
        )
}}}

export default Task