const Profile = require("../model/Profile.model");
const User = require("../model/User.model");
const { validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');

exports.getAllProfile = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');

  }

}

exports.addExperience = async (req, res) => {

  const {
    title,
    company,
    location,
    from,
    to,
    description
  } = req.body;

  const newExperience = {
    title,
    company,
    location,
    from,
    to,
    description

  }

  //@desc  Add experience to profile

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience.unshift(newExperience)
    console.log(profile)
    profile.save();

    res.json({ profile });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
// @desc Delete experience from profile
exports.deleteExperience = async (req, res) => {
  try {

    const profile = await Profile.findOne({ user: req.user.id });
    //Get remove index
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}

// @desc add education from profile
exports.addEducation = async (req, res) => {

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = req.body
  
  const newEducation = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEducation);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');

  }
}
//@desc delete education from profile

exports.deleteEducation= async(req,res)=>{
 try{
  const profile=Profile.findOne({user:req.user.id});
  //Get remove index
  const removeIndex=profile.education.map(item=>item.id).indexOf(req.params.exp_id);
  profile.education.splice(removeIndex,1);
  await profile.save();
  res.json(profile);
 }catch(err){

 }
}
// @desc  populated  id user with name and avatar that are in other model
exports.findUserbyId = async (req, res) => {
  try {


    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }
    res.json(profile)

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');

  }
}
exports.deleteProfile = async (req, res) => {
  try {
    //remove profile
    Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    User.findOneAndRemove({ _id: req.user.id })

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

}
//@ desc create profile

exports.createProfile = async (req, res) => {
  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
      // spread the rest of the fields we don't need to check
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
}