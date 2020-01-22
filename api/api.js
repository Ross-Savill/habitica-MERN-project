const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017')

const app = new express();
const port = process.env.PORT || 5000

app.use(cors())

app.get('/api', (req, res) => {
    return res.send({ message: "hello from api" })
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})