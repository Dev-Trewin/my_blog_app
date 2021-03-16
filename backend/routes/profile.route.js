module.exports=app=>{
    const profile=require('../controller/Profile.controller');
    app.get("/api/profile",()=>console.log("api profile"));
}