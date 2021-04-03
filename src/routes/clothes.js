'use strict';
const express = require('express');
const validator = require('../middleware/validator.js');
const Collection=require("../models/data-collection-class.js");
const clothesModel = require('../models/clothes.js');
const dataCollection = new Collection(clothesModel);


const router = express.Router();

router.get('/clothes',getClothes);
router.post('/clothes',createClothes);
router.get('/clothes/:id',validator,getClothesById);
router.put('/clothes/:id',validator,updateClothes);
router.delete('/clothes/:id',validator,deleteClothes);

// these are the Controller functions can be moved to /controllers/person.js
async function getClothes(req, res, next) {
    try {
      const resObj = await dataCollection.read();
      res.json(resObj);
    } catch (error) {
      next(error);
    }
  }
  
  function getClothesById(req, res, next) {
    dataCollection
      .read(req.params.id)
      .then((responseData) => {
        res.json(responseData[0]);
      })
      .catch((error) => {
        next(error);
      });
  }
  
  async function createClothes(req, res) {
    const clothesObject = req.body;
    try {
      const resObj = await dataCollection.create(clothesObject);
      res.status(201).json(resObj);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  async function updateClothes(req, res, next) {
    const clothesObject = req.body;
    try {
      const resObj = await dataCollection.update(req.params.id, clothesObject);
      res.json(resObj);
    } catch (error) {
      next(error);
    }
  }
  
  async function deleteClothes(req, res, next) {
    try {
      const resObj = await dataCollection.delete(req.params.id);
      res.json(resObj);
    } catch (error) {
      next(error);
    }
  }

module.exports = router;