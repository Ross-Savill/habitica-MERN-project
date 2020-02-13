const mongoose = require('mongoose')

const habiticaSchema = new mongoose.Schema({
  newData: Array
})

module.exports = mongoose.model('HabInfo', habiticaSchema)