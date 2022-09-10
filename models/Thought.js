const mongoose = require('mongoose')

const ThoughtSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  bodyText: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  tagList: {
    type: [String],
    required: false,
  },
  createdBy: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Thought', ThoughtSchema)
