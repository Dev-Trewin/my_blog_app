const { check } = require('express-validator');
const Auth= require('../middleware/auth');
module.exports=app=>{
    const profile=require('../controller/Profile.controller');
    app.get("/api/myprofile",Auth,profile.findUserbyId);
    app.post('/api/profile',[Auth,[
        check('status','Status is required')
        .not()
        .isEmpty(),
        check('skills','Skills is required')
        .not()
        .isEmpty()

    ]],profile.createProfile)
}