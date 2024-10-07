// controllers/recipeController.js

const db = require('../models');
const recipe = require('../models/recipe');

// Create a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const { name, description, instructions, created_by } = req.body;
    const recipe = await db.Recipe.create({ name, description, instructions, created_by });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all recipe
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await db.Recipe.findAll({
      include: [{
        model: db.Ingredient,
        as: 'ingredients'
      }]
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await db.Recipe.findByPk(req.params.id, {
      include: [{
        model: db.Ingredient,
        as: 'ingredients'
      }]
    });
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch recipes based on user-inputted ingredients
exports.getRecipesByIngredients = async (req, res) => {
  try {
      // Extract ingredients from query parameters
      const ingredients = req.query.ingredients.split(',').map(ingredient => ingredient.trim());

      if (ingredients.length === 0) {
          return res.status(400).json({ error: 'No ingredients provided' });
      }

      // Query the database for recipes that contain the provided ingredients
      const recipes = await db.Recipe.findAll({
          include: {
              model: db.Ingredient,
              where: {
                  name: {
                      [db.Sequelize.Op.in]: ingredients
                  }
              },
              through: { attributes: [] }  // Exclude RecipeIngredient join table data from results
          }
      });

      if (recipes.length === 0) {
          return res.status(404).json({ message: 'No recipes found with the provided ingredients' });
      }

      res.json(recipes);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Update a recipe
exports.updateRecipe = async (req, res) => {
  try {
    const { name, description, instructions } = req.body;
    const recipe = await db.Recipe.findByPk(req.params.id);
    if (recipe) {
      recipe.name = name || recipe.name;
      recipe.description = description || recipe.description;
      recipe.instructions = instructions || recipe.instructions;
      await recipe.save();
      res.json(recipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await db.Recipe.findByPk(req.params.id);
    if (recipe) {
      await recipe.destroy();
      res.json({ message: 'Recipe deleted' });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
