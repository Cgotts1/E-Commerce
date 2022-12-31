const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {       //I threw in the await
  // find all categories
  // be sure to include its associated Products

  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});










router.get('/:id', async (req, res) => {           //Added the await
  // find one category by its `id` value
  // be sure to include its associated Products


  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      include: [{ model: Traveller, through: Trip, as: 'category_products' }]
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

router.post('/', async (req, res) => {        //added async
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


  const id = req.params.id;
  const updates = req.body;

  // update the resource in the database using `id` and `updates`
  // ...

  res.send({ message: 'Resource updated successfully' });


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
