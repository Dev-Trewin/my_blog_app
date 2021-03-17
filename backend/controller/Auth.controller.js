const User=require('../model/User.model')
const {validationResult}=require('express-validator');
exports.findUserbyId=async(req,res)=>{
  try {
      const user= await User.findById(req.user.id).select('-password');
      console.log(user);
      res.json(user);
  } catch (err) {
      console.log(err);
      res.status(500).send('Server Error')
      
  }
}

exports.authUser=async(req,res)=>{
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

}