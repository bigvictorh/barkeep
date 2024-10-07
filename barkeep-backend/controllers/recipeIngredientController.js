// controllers/ingredientController.js

const db = require('../models');
const recipeIngredient = require('../models/recipeingredient');

// Create a new recipe ingredient
exports.createRecipeIngredient = async (req, res) => {
  try {
    const { recipe_id, ingredient_id, quantity, measurement_unit } = req.body;
    const recipeIngredient = await db.RecipeIngredient.create({ recipe_id, ingredient_id, quantity, measurement_unit });
    res.status(201).json(recipeIngredient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all recipe ingredient
exports.getRecipeIngredients = async (req, res) => {
    try {
      const { recipe_id, ingredient_id } = req.query;  // Extract query parameters
  
      let filter = {};  // Initialize an empty filter object
  
      // Add conditions to the filter object based on the presence of query parameters
      if (recipe_id) {
        filter.recipe_id = recipe_id;
      }
      if (ingredient_id) {
        filter.ingredient_id = ingredient_id;
      }
  
      // Find RecipeIngredient entries with the optional filter
      const recipeIngredients = await db.RecipeIngredient.findAll({
        where: filter
      });
  
      // Return the filtered list of recipe ingredients
      res.json(recipeIngredients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

// Update a recipe ingredient
exports.updateRecipeIngredient = async (req, res) => {
  try {
    const { recipe_id, ingredient_id, quantity, measurement_unit } = req.body;
    const recipeIngredient = await db.RecipeIngredient.findByPk(req.params.id);
    if (recipeIngredient) {
      recipeIngredient.recipe_id = recipe_id || recipeIngredient.recipe_id;
      recipeIngredient.ingredient_id = ingredient_id || recipeIngredient.ingredient_id;
      recipeIngredient.quantity = quantity || recipeIngredient.quantity;
      recipeIngredient.measurement_unit = measurement_unit || recipeIngredient.measurement_unit;
      await recipeIngredient.save();
      res.json(recipeIngredient);
    } else {
      res.status(404).json({ error: 'Recipe ingredient not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a ingredient
exports.deleteRecipeIngredient = async (req, res) => {
  try {
    const recipeIngredient = await db.RecipeIngredient.findByPk(req.params.id);
    if (recipeIngredient) {
      await recipeIngredient.destroy();
      res.json({ message: 'Recipe ingredient deleted' });
    } else {
      res.status(404).json({ error: 'Recipe ingredient not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
