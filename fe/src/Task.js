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
      habits: []
    }
  }

      handleUpdate = (e) => {

        e.preventDefault();
        const { dailies, habits, todos } = this.state;
        const arrayData = {
          dailies,
          habits,
          todos
        };

        const getCircularReplacer = () => {
          const seen = new WeakSet();
          return (key, value) => {
            if (typeof value === "object" && value !== null) {
              if (seen.has(value)) {
                return;
              }
              seen.add(value);
            }
            return value;
          };
        };

        let newArrayData = JSON.stringify(arrayData, getCircularReplacer());
        console.log(newArrayData)
        axios
        .post('http://localhost:5000/create', newArrayData)
        .then(console.log('Database Updated'))
        .catch(err => {
          console.error(err);
        });
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

    const pushIntoArrays = () => {
      this.state.habTaskData.data.data.map(task => {
        let { id, value, text, counterup, counterdown, completed } = task
          if(task.type === "daily") {
            dailiesArray.push({ id, value, text, completed })
          } else if(task.type === "todo") {
            todosArray.push({ id, value, text, completed })
          } else if (task.type === "habit") {
            habitsArray.push({ id, counterup, counterdown, text })
          }
      })
      setThoseStates()
    }

    const setThoseStates = () => {
      if(prevState.habTaskData !== this.state.habTaskData) {
        this.setState({
          dailies: dailiesArray,
          todos: todosArray,
          habits: habitsArray
        })
      }
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
              <button type="submit" onClick={this.handleUpdate}>Update Database</button>
              <div>
                <ol>
                  {dailies.map(job =>
                    <div key={job.id} className="dailiesListItem">
                      <li>{job.text} > {job.completed ? <img alt="completed" src={tick}></img> : <img alt="Incomplete" src={cross}></img>}</li>
                      <p></p>
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
                      <li>{job.text} > {job.completed ? <img alt="completed" src={tick}></img> : <img alt="Incomplete" src={cross}></img>}</li>
                      <p></p>
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
                  </div>
                )}
                </ol>
              </div>
            </div>
          </div>
        )
      }
    }
}

export default Task