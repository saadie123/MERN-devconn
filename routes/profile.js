const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();
const Profile = require('../models/Profile');
const User = require('../models/User');
const validateProfileInput = require('../validation/profile');
const validateExperienceInput = require('../validation/experience');
const validateEducationInput = require('../validation/education');

router.get('/all', async function(req, res){
    try {
        const errors = {};
        const profiles = await Profile.find().populate('user', ['name','avatar']);
        if(profiles.length === 0){
            errors.noprofile = 'There are no profiles';
            return res.status(404).send(errors);
        }        
        res.status(200).send(profiles);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/', passport.authenticate('jwt',{ session: false }),async function(req, res){
    const userProfile = await Profile.findOne({ user: req.user.id }).populate('user', ['name','avatar']);
    const errors = {};
    if(!userProfile){
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).send(errors);
    }
    return res.status(200).send(userProfile);
});

router.get('/handle/:handle', async function(req, res){
    const errors = {};
    const handle = req.params.handle;
    try {
        const profile = await Profile.findOne({ handle }).populate('user', ['name','avatar']);
        if(!profile){
            errors.noprofile = 'There is no profile for this user';        
            return res.status(404).send(errors);
        }
        res.status(200).send(profile);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/user/:userId', async function(req, res){
    const errors = {};
    const userId = req.params.userId;
    try {
        const profile = await Profile.findOne({ user: userId }).populate('user', ['name','avatar']);
        if(!profile){
            errors.noprofile = 'There is no profile for this user';        
            return res.status(404).send(errors);
        }
        res.status(200).send(profile);
    } catch (error) {
        res.status(500).send(error);
    }
});



router.post('/', passport.authenticate('jwt',{ session: false }), async function(req, res){
    const {errors, isValid} = validateProfileInput(req.body);
    if(!isValid){
        return res.status(400).send(errors);
    }
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubUsername) profileFields.githubUsername = req.body.githubUsername;
    if(typeof req.body.skills !== 'undefined'){
        profileFields.skills = req.body.skills.split(',');
    }
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twiiter) profileFields.social.twiiter = req.body.twiiter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    const userProfile = await Profile.findOne({ user: req.user.id });
    if(userProfile){
        const profile = await Profile.findOneAndUpdate({ user: req.user.id },{ $set: profileFields },{ new: true });
        return res.status(200).send(profile);
    } else {
        const profile = await Profile.findOne({ handle: profileFields.handle });
        if(profile){
            errors.handle = 'The handle already exists';
            return res.status.send(errors);
        }
        const newProfile = new Profile(profileFields);
        newProfile.save().then(profile => res.status(201).send(profile));
    }
});

router.post('/experience', passport.authenticate('jwt',{ session: false }), async function(req, res){
    const {errors, isValid} = validateExperienceInput(req.body);
    if(!isValid){
        return res.status(400).send(errors);
    }
    const profile = await Profile.findOne({ user: req.user.id });
    const experience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
    }
    profile.experience.unshift(experience);
    const updatedProfile = await profile.save();
    res.status(200).send(updatedProfile);
});

router.post('/education', passport.authenticate('jwt',{ session: false }), async function(req, res){
    const {errors, isValid} = validateEducationInput(req.body);
    if(!isValid){
        return res.status(400).send(errors);
    }
   try {
        const profile = await Profile.findOne({ user: req.user.id });
        const education = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        profile.education.unshift(education);
        const updatedProfile = await profile.save();
        return res.status(200).send(updatedProfile);
   } catch (error) {
       res.status(500).send(error);
   }
});

router.delete('experience/:expId', passport.authenticate('jwt',{ session: false }), async function(req, res){
    const expId = req.params.expId;
    try {
        const profile = await Profile.findOne({ user:req.user.id });
        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(expId);
        
        profile.experience.splice(removeIndex, 1);
        const updatedProfile = await profile.save();
        res.status(200).send(updatedProfile);  
    } catch (error) {
        res.status(500).send(error);
    }  
});

router.delete('education/:eduId', passport.authenticate('jwt',{ session: false }), async function(req, res){
    const eduId = req.params.eduId;
    try {
        const profile = await Profile.findOne({ user:req.user.id });
        const removeIndex = profile.education
            .map(item => item.id)
            .indexOf(eduId);
        
        profile.education.splice(removeIndex, 1);
        const updatedProfile = await profile.save();
        res.status(200).send(updatedProfile);  
    } catch (error) {
        res.status(500).send(error);
    }  
});

router.delete('/', passport.authenticate('jwt',{ session: false }), async function(req, res){
    try {
        await Profile.findByIdAndRemove({ user: req.user.id });
        await User.findByIdAndRemove({ _id: req.user.id });
        res.status(200).send({ success: true });
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;