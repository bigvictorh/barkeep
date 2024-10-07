const express = require('express');
const ingredientController = require('../controllers/ingredientController');
const router = express.Router();

// Define your routes
router.get('/', ingredientController.getAllIngredients);
router.post('/', ingredientController.createIngredient);
router.get('/:id', ingredientController.getIngredientById);
router.put('/:id', ingredientController.updateIngredient);
router.delete('/:id', ingredientController.deleteIngredient);

module.exports = router;
