const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
  console.log(req.body);
  let { location, stars, crowded, masks, entertainment, specials, quality, addComment} = req.body;
  let errors = [];


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
      addComment,
      // busId
    })
      .then(post => res.redirect('/seePost'))
      .catch(err => console.log(err));
  }

})

module.exports = router