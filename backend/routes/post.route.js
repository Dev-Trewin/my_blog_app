const Auth=require('../middleware/auth');
const checkObjectId = require('../middleware/checkObjectId');
module.exports=app=>{
    const Post=require("../controller/Post.controller")
    app.post("/api/posts",Auth,Post.CreatePost);
    app.get("/api/getposts",Auth,Post.GetPosts);
    app.get("/api/post:id",checkObjectId('id'),Auth,Post.GetPost);
    app.delete("/api/post:id",checkObjectId('id'),Auth,Post.DeletePost);
}