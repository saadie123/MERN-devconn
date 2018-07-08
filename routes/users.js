const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const config = require('../config/config');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const User = require('../models/User');

const router = express.Router();
const avatarColors = [
    'F44336', 'E91E63', '9C27B0', '673AB7', '3F51B5',
    '2196F3', '03A9F4', '00BCD4', '009688', '4CAF50', '8BC34A',
    'CDDC39', 'FFEB3B', 'FFC107', 'FF9800', 'FF5722'
];
router.post('/register', async function(req, res) {
    const {errors, isValid} = validateRegisterInput(req.body);
    try {
        if(!isValid){
            return res.status(400).send(errors);
        }
        const dbUser = await User.findOne({ email: req.body.email });
        if(dbUser){
            return res.status(400).send({ email: 'Email is already in use' });
        }
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(req.body.password, salt, async function(err, hash){
                const random = Math.floor(Math.random() * 14);
                const randomColor = avatarColors[random];
                const avatar = `https://ui-avatars.com/api/?name=${req.body.name}&size=200&background=${randomColor}&color=fff`;
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    avatar
                });
                const newUser = await user.save();
                const responseUser = {
                    name: newUser.name,
                    email: newUser.email,
                    avatar: newUser.avatar
                }
                return res.status(201).send({user: responseUser});
            });
        });
    } catch (error) {
        return res.status(500).send({ error });
    }
});


router.post('/login', async function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid){
        return res.status(400).send(errors);
    }
    const user = await User.findOne({ email });
    if(!user){
        return res.status(404).send({ email: 'User not found' });
    }
    bcrypt.compare(password, user.password, function(err, matched){
        if(!matched){
            return res.status(400).send({ password: 'Password is incorrect' });            
        }
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }
        jwt.sign(payload, config.secret,{ expiresIn: '1h' }, function(err, token){
            return res.status(200).send({ 
                success: true,
                message: 'Logged in successfully', 
                token: `Bearer ${token}` 
            });
        });
    });
});

router.get('/current', passport.authenticate('jwt',{ session: false }), function(req, res){
    const responseUser = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
    }
    res.status(200).send(responseUser);
});

module.exports = router;