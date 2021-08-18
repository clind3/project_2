const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
  let { location, stars, crowded, masks, entertainment, specials, quality, addComment } = req.body;
  let errors = [];

  //Validation Fields
  if (!location) {
    errors.push({ text: 'Please select a location' });
  }
  if (!stars && !crowded && !masks && !entertainment && !specials && !quality && !addComment) {
    errors.push({ text: 'Please enter atleast one review value' });
  }

  //Check for errors
  if (errors.length > 0) {
    res.render('post', {
      errors,
      location, 
      stars, 
      crowded, 
      masks, 
      entertainment, 
      specials, 
      quality, 
      addComment
    })
  } else {
    Post.create({
      location,
      starts,
      crowded,
      masks,
      entertainment,
      specials,
      quality,
      addComment
    })
      .then(post => res.redirect('/seePost'))
      .catch(err => console.log(err));
  }

})

module.exports = router