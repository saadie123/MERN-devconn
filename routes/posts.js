const express = require('express');
const passport = require('passport');

const validatePostInput = require('../validation/post');
const validateCommentInput = require('../validation/comment');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();

router.get('/', async function(req, res) {
    try {
        const errors = {};
        const posts = await Post.find().sort({ date: -1 }).populate('user',['name', 'avatar']).populate('comments').deepPopulate('comments.user');
        if(posts.length === 0){
            errors.noposts = 'No posts found';
            return res.status(404).send(errors);
        }
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async function(req, res) {
    try {
        const id = req.params.id;
        const errors = {};
        const post = await Post.findById(id).populate('user',['name', 'avatar']).populate('comments').populate('comments.user',['name','avatar']);
        if(post.length === 0){
            errors.nopost = 'Post was not found';
            return res.status(404).send(errors);
        }
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.post('/', passport.authenticate('jwt', { session: false }), async function(req, res){
    const {errors, isValid} = validatePostInput(req.body);
    if(!isValid){
        return res.status(400).send(errors);
    }
    const post = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });
    try {
        const newPost = await post.save();
        return res.status(201).send(newPost);
    } catch (error) {
        res.status(500).send(error); 
    }
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), async function(req, res){
    const id = req.params.id;
    try {
        const user = await User.findById(req.user.id);
        const post = await Post.findById(id);
        if(!post){
            return res.status(404).send({ notfound: 'Post was not found' });
        }
        if(post.user.toString() !== user.id){
            return res.status(401).send({ notauthorized: 'User not authorized' });
        }
        const deletedPost = await post.remove();
        if (deletedPost.comments.length > 0) {
            for(let comment in deletedPost.comments){
                await Comment.findByIdAndRemove(comment);
            }
        }
        res.status(200).send({ success: true });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/:id/like', passport.authenticate('jwt', { session: false }), async function(req, res){
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        const userLikes = post.likes.filter(like => like.user.toString() === req.user.id);
        if(userLikes.length > 0){
            return res.status(400).send({ alreadyliked: 'User already liked this post' });
        }
        post.likes.unshift({ user: req.user.id });
        const updatedPost = await post.save();
        res.status(200).send(updatedPost);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/:id/unlike', passport.authenticate('jwt', { session: false }), async function(req, res){
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        const userLikes = post.likes.filter(like => like.user.toString() === req.user.id);
        if(userLikes.length === 0){
            return res.status(400).send({ notiked: 'You have not yet liked this post' });
        }
        const likeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(likeIndex, 1);
        const updatedPost = await post.save();
        res.status(200).send(updatedPost);
    } catch (error) {
        res.status(500).send(error);        
    }
});

router.post('/:id/comment', passport.authenticate('jwt', { session: false }), async function(req, res){
    const id = req.params.id;
    const {errors, isValid} = validateCommentInput(req.body);
    if(!isValid){
        return res.status(400).send(errors);
    }
    try {
        const post = await Post.findById(id);
        if(!post){
            return res.status(404).send({ notfound: 'Post was not found' });
        }
        const comment = new Comment({
            text: req.body.text,
            name: req.user.name,
            avatar: req.user.avatar,
            user: req.user.id
        });
        const savedComment = await comment.save();
        post.comments.unshift(savedComment.id);
        const updatedPost = await post.save();
        res.status(200).send(updatedPost);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/:id/comment/:commentId', passport.authenticate('jwt', { session: false }), async function(req, res){
    const postId = req.params.id;
    const commentId = req.params.commentId;
    const post = await Post.findById(postId);
    if(!post){
        return res.status(404).send({ notfound: 'Post was not found' });
    }
    const comment = await Comment.findByIdAndRemove(commentId);
    if(!comment){
        return res.status(404).send({ commentnotfound: 'Comment does not exist' });        
    }
    const commentIndex = post.comments.indexOf(commentId);
    if(commentIndex >= 0){
        post.comments.splice(commentIndex, 1);
    }
    const updatedPost = await post.save();
    res.status(200).send(updatedPost);
});

module.exports = router;
