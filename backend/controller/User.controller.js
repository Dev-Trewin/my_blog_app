const User=require('../model/User.model')
const {validationResult}=require('express-validator');

exports.createUser =  async(req, res) => {
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  } 
  
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
    try{
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      res.sen("user route");
    }catch(err){
     console.errors(err.message);
    }
};
