const express = require('express');
const router = express.Router();
const itemController = require('../controller/itemController');

//  Create a new item
router.post('/createItem', itemController.createItem);

// Read items according to the pagination , filtering , sorting of the data:
router.get('/getItem',itemController.getItemsByQuery);

// Read items with its id:
router.get('/getItemBy/:id', itemController.getItems);

// Update an item by ID
router.put('/updateItem/:id', itemController.updateItem);

// Delete an item by ID
router.delete('/deleteItem/:id', itemController.deleteItem);

module.exports = router;