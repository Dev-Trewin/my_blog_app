const Auth=require('../middleware/auth');
module.exports=app=>{
    const post=require("../controller/Post.controller")
    app.get("/api/post",Auth,post.CreatePost);
}