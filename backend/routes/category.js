// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controller/CategoryController');

// Add Category
router.post('/add', categoryController.addCategory);

// Get All Categories
router.get('/getCategory', categoryController.getAllCategories);

// Get Category by ID
router.get('/getCategory/:id', categoryController.getCategoryById);

// Delete Category by ID
router.delete('/delete/:id', categoryController.deleteCategory);

router.get('/count',categoryController.getCategoryCount);


module.exports = router;
