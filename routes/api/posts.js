const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validatePostInput = require('../../validaiton/post');

// Load Models - Post | Profile
const Post = require('.././models/Post');
const Profile = require('.././models/Profile');

// @routes GET api/posts/test
// @desc   Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({
  msg: 'Posts Works!'
}));

// @routes POST api/posts
// @desc   Create post
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check Validation
  if(!isValid) {
    retrun res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.body.user
  });

  newPost.save().then(post => res.json(post));
});

module.exports = router;
