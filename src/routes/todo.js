'use strict';
const express = require('express');
const validator = require('../middleware/validator.js');
const Collection=require("../models/data-collection-class.js");
const todoModel = require('../models/todo.js');
const dataCollection = new Collection(todoModel);


const router = express.Router();

router.get('/todo',getTodo);
router.post('/todo',createTodo);
router.get('/todo/:id',validator,getTodoById);
router.put('/todo/:id',validator,updateTodo);
router.delete('/todo/:id',validator,deleteTodo);

// these are the Controller functions can be moved to /controllers/person.js
async function getTodo(req, res, next) {
    try {
      const resObj = await dataCollection.read();
      res.json(resObj);
    } catch (error) {
      next(error);
    }
  }
  
  function getTodoById(req, res, next) {
    dataCollection
      .read(req.params.id)
      .then((responseData) => {
        res.json(responseData[0]);
      })
      .catch((error) => {
        next(error);
      });
  }
  
  async function createTodo(req, res) {
    const TodoObject = req.body;
    try {
      const resObj = await dataCollection.create(TodoObject);
      res.status(201).json(resObj);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  async function updateTodo(req, res, next) {
    const TodoObject = req.body;
    try {
      const resObj = await dataCollection.update(req.params.id, TodoObject);
      res.json(resObj);
    } catch (error) {
      next(error);
    }
  }
  
  async function deleteTodo(req, res, next) {
    try {
      const resObj = await dataCollection.delete(req.params.id);
      res.json(resObj);
    } catch (error) {
      next(error);
    }
  }

module.exports = router;