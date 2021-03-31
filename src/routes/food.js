'use strict';
const express = require('express');
const validator = require('../middleware/validator.js');
const Collection=require("../models/data-collection-class.js");
const foodModel = require('../models/food.js');
const dataCollection = new Collection(foodModel);


const router = express.Router();

router.get('/food',getFood);
router.post('/food',createFood);
router.get('/food/:id',validator,getFoodById);
router.put('/food/:id',validator,updateFood);
router.delete('/food/:id',validator,deleteFood);

// these are the Controller functions can be moved to /controllers/person.js
async function getFood(req, res, next) {
    try {
      const resObj = await dataCollection.read();
      res.json(resObj);
    } catch (error) {
      next(error);
    }
  }
  
  function getFoodById(req, res, next) {
    dataCollection
      .read(req.params.id)
      .then((responseData) => {
        res.json(responseData[0]);
      })
      .catch((error) => {
        next(error);
      });
  }
  
  async function createFood(req, res) {
    const clothesObject = req.body;
    try {
      const resObj = await dataCollection.create(clothesObject);
      res.status(201).json(resObj);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  async function updateFood(req, res, next) {
    const clothesObject = req.body;
    try {
      const resObj = await dataCollection.update(req.params.id, clothesObject);
      res.json(resObj);
    } catch (error) {
      next(error);
    }
  }
  
  async function deleteFood(req, res, next) {
    try {
      const resObj = await dataCollection.delete(req.params.id);
      res.json(resObj);
    } catch (error) {
      next(error);
    }
  }

module.exports = router;