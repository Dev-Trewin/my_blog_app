const {check,validationResult}=require('express-validator');

module.exports=app=>{
   const user=require('../controller/User.controller');

     app.post('/api/user'
     ,user.createUser);



}