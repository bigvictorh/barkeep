const express = require('express');
const recipeIngredientController = require('../controllers/recipeIngredientController');
const router = express.Router();

// Define your routes
router.get('/', recipeIngredientController.getRecipeIngredients);
router.post('/', recipeIngredientController.createRecipeIngredient);
router.put('/:id', recipeIngredientController.updateRecipeIngredient);
router.delete('/:id', recipeIngredientController.deleteRecipeIngredient);

module.exports = router;
