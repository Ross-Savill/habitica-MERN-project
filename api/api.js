const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017')

// const HabInfo = require('./models/habInfo')

const app = new express();
const port = process.env.PORT || 5000

app.use(cors({origin: 'http://localhost:3000'}))

app.get('/', (req, res) => {
    // HabInfo.find({})
    // .then(docs => res.send(docs))
    return res.send({ message: "hello from api" })
})

let data = []

app.post('/create', function(req, res) {
  const newData = {
    dailiesArray: req.body.dailiesArray,
    habitsArray: req.body.habitsArray,
    todosArray: req.body.todosArray,
  };

  data.push(newData);
  console.log(data);
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})