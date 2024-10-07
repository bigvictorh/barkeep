'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Ingredient extends Model {
    // You can define custom methods or associations here
    static associate(models) {
      // Define associations here, if any
      // Example: An ingredient might be associated with multiple recipes in a many-to-many relationship
      this.belongsToMany(models.Ingredient, {
        through: 'RecipeIngredient',
        foreignKey: 'ingredient_id',
        otherKey: 'recipe_id',
        as: 'recipes'
    });
    }
  }

  Ingredient.init({
    ingredient_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    alcohol_content: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
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
    modelName: 'Ingredient', // The name of the model
    tableName: 'ingredients', // Specify the table name
    timestamps: false, // Automatically manage `createdAt` and `updatedAt` fields
    underscored: true // Use snake_case for automatically added fields like `created_at` and `updated_at`
  });

  return Ingredient;
};
