const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017')

const HabInfo = require('./models/habInfo')

const app = new express();
const port = process.env.PORT || 5000

app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())

app.get('/', (req, res) => {
    return res.send({ message: "hello from api" })
})

let data = []

app.post('/create', function(req, res) {
  const newData = {
    dailies: req.body.dailies,
    habits: req.body.habits,
    todos: req.body.todos,
  };
  data.push(newData);
  HabInfo.find({})
  .then(res.send(data))
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})