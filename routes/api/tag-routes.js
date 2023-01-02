const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
    
  try{
  const tagData = await Tag.findAll({
        include: [{ model: Product }],
      });
      res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
      }

});

    
    
    
    // try {
    //   const tagData = await Tag.findAll();
    //   res.status(200).json(tagData);
      
    // } catch (err) {
    //   res.status(500).json(err);
    // }





router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  }
);










router.post('/', async (req, res) => {
  // create a new tag

  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }

});









router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value

  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      // find all associated tags from ProductTag
      return Tag.findAll({ where: { tag_id: req.params.id } });
    })
    .then((tag) => {
      // get list of current tag_ids
      const tagIds = tag.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newTag = req.body.tagIds
        .filter((tag_id) => !tagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            tag_id: req.params.id,
            tag_id,               //This was tag_id and I changed it to tag_name(both ways worked)
          };
        });
      // figure out which ones to remove
      const tagToRemove = tag
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        Tag.destroy({ where: { id: tagToRemove } }),
        Tag.bulkCreate(newTag),
      ]);
    })
    .then((updatedTag) => res.json(updatedTag))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});






  
  
  
  
  
  
  
  
  router.delete('/:id', async (req, res) => {
    // delete on tag by its `id` value
    
    
    try {
      const tagData = await Tag.destroy({
        where: {
          id: req.params.id
        }
      });
      
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
      
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
    
    
});

module.exports = router;















// Put method


// Tag.update(req.body, {
//   where: {
//     id: req.params.id,
//   },
// })
//   .then((tag) => {
   
//     return Tag.findAll({ where: { product_id: req.params.id } });
//   })
//   .then((tag) => {
    
//     const tagIds = tag.map(({ product_id }) => product_id);
//     const newTags = req.body.productIds
//       .filter((product_id) => !tagIds.includes(product_id))
//       .map((product_id) => {
//         return {
//           product_id: req.params.id,
//           tag_id,
//         };
//       });

//     const tagsToRemove = productTags
//       .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//       .map(({ id }) => id);

//     // run both actions
//     return Promise.all([
//       tag.destroy({ where: { id: tagsToRemove } }),
//       tag.bulkCreate(newTags),
//     ]);
//   })
//   .then((updatedTags) => res.json(updatedTags))
//   .catch((err) => {
//     // console.log(err);
//     res.status(400).json(err);
//   });