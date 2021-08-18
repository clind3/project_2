const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
  let { location, stars, crowded, masks, entertainment, specials, quality, addComment } = req.body;
  let errors = [];

  console.log(location);

  //Validation Fields
  if (location=='null') {
    errors.push({ text: 'Please select a location' });
  }
  if (stars=='null' && crowded=='null' && masks=='null' && entertainment=='null' && specials=='null' && quality=='null' && !addComment) {
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
    });
  } else {
    Post.create({
      location,
      stars,
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