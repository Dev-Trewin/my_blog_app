const Profile = require("../model/Profile.model");
const User=require("../model/User.model");
const {validationResult}=require('express-validator');
exports.findUserbyId = async (req, res) => {
    try {
      
        //populated  id user with name and avatar that are in other model
        const profile = await Profile.findOne({
            user: req.user.id
          }).populate('user', ['name', 'avatar']);
      if(!profile){
          return res.status(400).json({msg:'There is no profile for this user'})
      }
        res.json(profile)

    } catch (err) {
       console.error(err);
       res.status(500).send('Server Error');

    }
}

exports.createProfile=async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
    }
     // destructure the request
     const {
        website,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        // spread the rest of the fields I don't need to check
        ...rest
      } = req.body;
        // build a profile
    const profileFields = {
        user: req.user.id,
        website:
          website && website !== ''
            ? normalize(website, { forceHttps: true })
            : '',
        skills: Array.isArray(skills)
          ? skills
          : skills.split(',').map((skill) => ' ' + skill.trim()),
        ...rest
      };
      // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;
    try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        return res.json(profile);
      } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
}