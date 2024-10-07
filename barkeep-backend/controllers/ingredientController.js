// controllers/ingredientController.js

const db = require('../models');
const ingredient = require('../models/ingredient');

// Create a new ingredient
exports.createIngredient = async (req, res) => {
  try {
    const { name, type, alcohol_content } = req.body;
    const ingredient = await db.Ingredient.create({ name, type, alcohol_content });
    res.status(201).json(ingredient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all ingredient
exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await db.Ingredient.findAll();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a ingredient by ID
exports.getIngredientById = async (req, res) => {
  try {
    const ingredient = await db.Ingredient.findByPk(req.params.id);
    if (ingredient) {
      res.json(ingredient);
    } else {
      res.status(404).json({ error: 'Ingredient not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a ingredient
exports.updateIngredient = async (req, res) => {
  try {
    const { name, description, instructions } = req.body;
    const ingredient = await db.Ingredient.findByPk(req.params.id);
    if (ingredient) {
      ingredient.name = name || ingredient.name;
      ingredient.type = type || ingredient.type;
      ingredient.alcohol_content = alcohol_content || ingredient.alcohol_content;
      await ingredient.save();
      res.json(ingredient);
    } else {
      res.status(404).json({ error: 'Ingredient not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a ingredient
exports.deleteIngredient = async (req, res) => {
  try {
    const ingredient = await db.Ingredient.findByPk(req.params.id);
    if (ingredient) {
      await ingredient.destroy();
      res.json({ message: 'Ingredient deleted' });
    } else {
      res.status(404).json({ error: 'Ingredient not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
