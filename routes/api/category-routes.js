const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {      
  // find all categories
  // be sure to include its associated Products

  
  
  try{
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});




// try {
//   const categoryData = await Category.findAll();
//   res.status(200).json(categoryData);
// } catch (err) {
//   res.status(500).json(err);
// }






router.get('/:id', async (req, res) => {           
  // find one category by its `id` value
  // be sure to include its associated Products


  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      include: [{ model: Product}]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});





router.post('/', async (req, res) => {        
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});



router.put('/:id', (req, res) => {
  // update a category by its `id` value
 


  // update product data
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      // find all associated tags from ProductTag
      return Category.findAll({ where: { category_id: req.params.id } });
    })
    .then((category) => {
      // get list of current tag_ids
      const categoryIds = category.map(({ category_id }) => category_id);
      // create filtered list of new tag_ids
      const newCategory = req.body.categoryIds
        .filter((category_id) => !categoryIds.includes(category_id))
        .map((category_id) => {
          return {
            product_id: req.params.id,
            category_id,
          };
        });
      // figure out which ones to remove
      const categoryToRemove = category
        .filter(({ category_id }) => !req.body.tagIds.includes(category_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        Category.destroy({ where: { id: categoryToRemove } }),
        Category.bulkCreate(newCategory),
      ]);
    })
    .then((updatedCategory) => res.json(updatedCategory))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});







router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value


  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
