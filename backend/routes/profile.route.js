const { check } = require('express-validator');
const Auth= require('../middleware/auth');
module.exports=app=>{
    const profile=require('../controller/Profile.controller');
    app.get("/api/profile",Auth,profile.getAllProfile);
    app.put("/api/experience",Auth,profile.addExperience);
    app.delete("/api/delete/:exp_id",Auth,profile.deleteExperience)
    app.put("/api/education",Auth,profile.addEducation);
    app.get("/api/myprofile",Auth,profile.findUserbyId);
    app.delete("/api/profile",Auth,profile.deleteProfile);
    app.post('/api/profile',[Auth,[
        check('status','Status is required')
        .not()
        .isEmpty(),
        check('skills','Skills is required')
        .not()
        .isEmpty()

    ]],profile.createProfile)
}