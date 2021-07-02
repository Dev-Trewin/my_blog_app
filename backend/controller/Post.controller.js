const Post = require("../model/Post");
const User = require("../model/User.model");
const { validationResult } = require('express-validator');
//@route Post api/post
//@desc create new post
//@access Private
exports.CreatePost = async (req, res) => {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }


        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });
       
        const post=await newPost.save();
        console.log(newPost)
        
        res.json({post});
    } catch (err) {
     console.error(err.message);
     res.status(500).send('Server Error')
    }
}
//@route Get api/getposts
//@desc Get all posts
//@access Private
   exports.GetPosts = async(req,res)=>{
    try{
        //get all posts most recently
     const posts= await Post.find().sort({date:-1})
     res.json(posts); 
     }catch(err){
     console.error(err.message)
     res.status(500).send('Server Error');
    }
    }
//@route Get api/getposts/:id
//@desc Get post by ID
//@access Private
exports.GetPost = async(req,res)=>{
    console.log(req.params.id)
    try{
        //get all posts most recently
     const post= await Post.findById(req.params.id);
     
     console.log(req.params.id)
     if(!post){
         return res.status(404).json({msg:'Post not found'})
     }
     res.json(post); 
     }catch(err){

     console.error(err.message)
   
    res.status(500).send('Server Error');
    }
    }

//@route delete api/getposts/:id
//@desc Delte a post
//@access Private
exports.DeletePost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
    
        if (!post) {
          return res.status(404).json({ msg: 'Post not found' });
        }
    
        // Check user
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'User not authorized' });
        }
    
        await post.remove();
    
        res.json({ msg: 'Post removed' });
      } catch (err) {
        console.error(err.message);
    
        res.status(500).send('Server Error');
      }
    }
