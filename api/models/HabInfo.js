const mongoose = require('mongoose')

const habiticaSchema = new mongoose.Schema({
  dailies: Array,
  habits: Array,
  Todos: Array
})

module.exports = mongoose.model('HabInfo', habiticaSchema)