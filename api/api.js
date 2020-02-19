const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  })

const HabInfo = require('./models/habInfo')

const app = new express();
const port = process.env.PORT || 5000

app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.send({ message: "hello from api" })
})

app.post('/create', function(req, res) {
  const newData = {
    dailies: req.body.dailies,
    habits: req.body.habits,
    todos: req.body.todos
  };
  let dataKeep = new HabInfo({ newData });
  dataKeep.save(function (err, data) {
    if (err) return console.error(err);
    console.log(JSON.stringify(req.body, undefined, '\t'))
  })

});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})

// lsof -i :27017 OR sudo lsof -iTCP -sTCP:LISTEN -n -P
// kill -9 17381 OR sudo kill <mongo_command_pid>
// "lsof -i :27017"
// sudo mongod --dbpath /System/Volumes/Data/data/db