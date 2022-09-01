const mongoose = require('mongoose')

const ThoughtSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  thoughtText: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Thought', ThoughtSchema)
