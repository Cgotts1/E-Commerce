// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

Product.belongsTo(Category, {

  foreignKey: 'product_id',

})

// Categories have many Products


Category.hasMany(Product, {

  foreignKey: 'Category_id',
  onDelete: 'CASCADE',

})



// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {

})


// Tags belongToMany Products (through ProductTag)




Tag.belongsToMany(ProductTag, {




})





module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
