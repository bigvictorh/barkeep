'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Recipe extends Model {
    // You can define custom methods or associations here
    static associate(models) {
      // Define association here
      // Example: A recipe belongs to a user (created_by)
      this.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
      // Define many-to-many association with Ingredient
      this.belongsToMany(models.Ingredient, {
        through: 'RecipeIngredient', // The join table that connects Recipes and Ingredients
        foreignKey: 'recipe_id',
        otherKey: 'ingredient_id',
        as: 'ingredients' // Alias for the association
      });
    }
  }

  Recipe.init({
    recipe_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // 'Users' refers to the table name
        key: 'user_id',
      },
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize, // The connection instance
    modelName: 'Recipe', // The name of the model
    tableName: 'recipes', // Specify the table name
    timestamps: false, // Automatically manage `createdAt` and `updatedAt` fields
    underscored: true // Use snake_case for automatically added fields like `created_at` and `updated_at`
  });

  return Recipe;
};
