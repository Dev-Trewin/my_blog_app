const auth=require('../middleware/auth');
const Auth=require('../controller/Auth.controller');
const {check,validationResult}=require('express-validator');
module.exports=app=>{
    app.get("/api/auth",auth,Auth.findUserbyId);
    app.post("/api/auth",[
         check('email','Please enter a valid email').not().isEmpty(),
        check('password','password is required').exists()],Auth.authUser)
} 