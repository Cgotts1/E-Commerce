// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
})



// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'product_id',                // may have to set product_id to category_id
  onDelete: 'SET NULL',
})



// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: 'productTag_id',
})


// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
through: 'productTag_id',
})





module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
