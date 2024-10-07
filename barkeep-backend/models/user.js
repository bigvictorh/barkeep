'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    // You can define custom methods or associations here
    static associate(models) {
      // Define association here, if any
      // Example: this.hasMany(models.Recipe, { foreignKey: 'created_by' });
    }
  }

  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: DataTypes.STRING,
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
    modelName: 'User', // The name of the model
    tableName: 'users', // Optional: specify the table name, otherwise Sequelize will use the pluralized model name
    timestamps: false, // Automatically manage `createdAt` and `updatedAt` fields
    underscored: true // Use snake_case for automatically added fields like `created_at` and `updated_at`
  });

  return User;
};
