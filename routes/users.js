const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const router = express.Router();
const avatarColors = [
    'F44336', 'E91E63', '9C27B0', '673AB7', '3F51B5',
    '2196F3', '03A9F4', '00BCD4', '009688', '4CAF50', '8BC34A',
    'CDDC39', 'FFEB3B', 'FFC107', 'FF9800', 'FF5722'
];
router.post('/register', async function(req, res) {
    try {
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
                return res.status(201).send({user: newUser});
            });
        });
    } catch (error) {
        return res.status(500).send({ error });
    }
});


module.exports = router;