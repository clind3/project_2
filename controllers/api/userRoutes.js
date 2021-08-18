const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  let { first_name, last_name, username, email, pw } = req.body;
  let errors = [];

  //Validating fields
  if(!first_name){
    errors.push({text: 'Please enter first name'});
  }

  if(!last_name){
    errors.push({text: 'Please enter last name'});
  }

  if(!username){
    errors.push({text: 'Please enter username'});
  }

  if(!email){
    errors.push({text: 'Please enter email'});
  }

  if(!pw){
    errors.push({text: 'Please enter password'});
  }

 //Check for errors
  if (errors.length > 0) {
    res.render('login', {
      errors,
      first_name, 
      last_name, 
      username, 
      email, 
      pw
    })
  } else {
    User.create({
      first_name, 
      last_name, 
      username, 
      email, 
      pw
    })
      .then(user => res.redirect('homepage'))
      .catch(err => console.log(err));
  }

})

  module.exports = router