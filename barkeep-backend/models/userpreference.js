'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class UserPreference extends Model {
    // You can define custom methods or associations here
    static associate(models) {
      // Define association here
      // Example: This model belongs to a User
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  UserPreference.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // Table name that this FK references
        key: 'user_id',
      },
      primaryKey: true,
    },
    preference_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize, // The connection instance
    modelName: 'UserPreference', // The name of the model
    tableName: 'userpreferences', // Specify the table name
    timestamps: false, // Automatically manage `createdAt` and `updatedAt` fields
    underscored: true, // Use snake_case for column names
  });

  return UserPreference;
};
