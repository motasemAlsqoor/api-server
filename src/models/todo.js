"use strict";
const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  text: { type: String, required: true },
  assignee: { type: String },
  complete: { type: Boolean, default: false },
  difficulty: { type: Number, default: 1 },
});
// this line will create the collection (sql table) with name 'person'
const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel;
