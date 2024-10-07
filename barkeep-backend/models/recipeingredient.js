'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class RecipeIngredient extends Model {
    // You can define custom methods or associations here
    static associate(models) {
      // Define associations here
      // Example: This model belongs to both Recipe and Ingredient
      this.belongsTo(models.Recipe, { foreignKey: 'recipe_id' });
      this.belongsTo(models.Ingredient, { foreignKey: 'ingredient_id' });
    }
  }

  RecipeIngredient.init({
    recipe_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Recipes', // Table name that this FK references
        key: 'recipe_id',
      },
      primaryKey: true
    },
    ingredient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Ingredients', // Table name that this FK references
        key: 'ingredient_id',
      },
      primaryKey: true
    },
    quantity: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    measurement_unit: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize, // The connection instance
    modelName: 'RecipeIngredient', // The name of the model
    tableName: 'recipeingredients', // Specify the table name
    timestamps: false, // No need for createdAt/updatedAt fields in a join table
    underscored: true // Use snake_case for column names
  });

  return RecipeIngredient;
};
