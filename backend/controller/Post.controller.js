const Post = require("../model/Post");
const UserModel = require("../model/User.model");

exports.CreatePost = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }
        const post=await newPost.save();
        res.json(post);
    } catch (err) {
     console.error(err.message);
     res.status(500).send('Server Error')
    }

}
