'use strict';
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
});
// this line will create the collection (sql table) with name 'person'
const foodModel = mongoose.model('food', foodSchema);

module.exports = foodModel;