// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    price: {                                // Add validates the value is a decimal
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    stock: {                                // Add validates that the value is numeric
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
    category_id: {                            // Add references the Category model's id
      type: DataTypes.INTEGER,
      references: {
        // This references the `category model, which we set in `Category.js` as its `modelName` property
        model: 'category',
        key: 'id',
      },
    },


  },
  {

    // When adding hooks via the init() method, they go below
    hooks: {
      // Use the beforeCreate hook to work with data before a new instance is created
      beforeCreate: async (newUserProduct) => {
        // In this case, we are taking the user's product, and making all letters lower case before adding it to the database.
        newUserProduct.product = await newUserData.product.toLowerCase();
        return newUserData;
      },
      // Here, we use the beforeUpdate hook to make all of the characters lower case in an updated product, before updating the database.
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.product = await updatedUserData.product.toLowerCase();
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
