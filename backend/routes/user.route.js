const {check,validationResult}=require('express-validator');

module.exports=app=>{
   const user=require('../controller/User.controller');

     app.post('/api/user',[
         check('name','name is required').not().isEmpty(),
         check('email','Please enter a valid email').not().isEmpty(),
         check('password',
         'Please enter a valid password with 6 or more characters')
         .isLength({min:6})
     ],user.createUser);



}