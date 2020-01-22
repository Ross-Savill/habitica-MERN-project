const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017')

const HabInfo = require('./models/habInfo')

const app = new express();
const port = process.env.PORT || 5000

app.use(cors())

app.get('/rosshabitica', (req, res) => {
    HabInfo.find({})
    .then(docs => res.send(docs))
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})