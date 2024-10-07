const express = require('express');
const { body, validationResult } = require('express-validator');
const recipeController = require('../controllers/recipeController');
const router = express.Router();

// Validation and sanitization for creating or updating a recipe
const recipeValidationRules = [
  body('name').isString().trim().escape().withMessage('Name is required and must be a string'),
  body('description').optional().isString().trim().escape(),
  body('instructions').optional().isString().trim().escape(),
  body('created_by').isInt().withMessage('Created by must be a valid user ID')
];

// Middleware to handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Define your routes
router.get('/', recipeController.getAllRecipes);
router.post('/', recipeValidationRules, validate, recipeController.createRecipe);
router.get('/:id', recipeController.getRecipeById);
router.put('/:id', recipeValidationRules, validate, recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);
// Define the route for fetching recipes based on ingredients
/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Retrieve a list of recipes based on ingredients
 *     parameters:
 *       - in: query
 *         name: ingredients
 *         schema:
 *           type: string
 *         required: true
 *         description: Comma-separated list of ingredients
 *     responses:
 *       200:
 *         description: A list of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   recipe_id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   instructions:
 *                     type: string
 *       400:
 *         description: Bad Request
 *       404:
 *         description: No recipes found
 */
router.get('/', recipeController.getRecipesByIngredients);

module.exports = router;
