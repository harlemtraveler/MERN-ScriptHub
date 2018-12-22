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

// @routes GET api/posts
// @desc   Get post
// @access Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: '[!] No posts found' }));
});

// @routes GET api/posts/:id
// @desc   Get post by id
// @access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: '[!] No post found with that ID' }));
});

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

// @routes DELETE api/posts/:id
// @desc   Delete post
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Get user by ID
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get post by post's ID
      Profile.findById(req.params.id)
        .then(post => {
          // Check for post's owner (userd ".toString" method to covert Object to string)
          if(post.user.toString() !== req.user.id) {
            // Status code 401 is for "Unautherized"
            return res.status(401).json({ notauthorized: '[!] User not autherized' });
          }

          // Delete
          post.remove().then(() => res.json({ sucess: true }));
        })
        .catch(err => res.status(404).json({ nopostfound: '[!] No post found' }));
    });
});

// @routes POST api/posts/like/:id
// @desc   Like post
// @access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Profile.findById(req.params.id)
        .then(post => {
          // Ref "Listing 1.1" for details
          if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyliked: '[!] User already liked this post' });
          }

          // Add user ID to "likes" array
          post.likes.unshift({ user: req.params.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ nopostfound: '[!] No post found' }));
    });
});

module.exports = router;

/*
  Listing 1.1:

  Check post to see if user already liked it:

  - Check the array of "likes" for the targeted post.
  - Use ".filter" method to iterate through the array of "likes".
  - Specifically check the "user" property of each "like".
  - Use ".toString" method to convert the "like" object to a String.
  - Compare the "user" property of each "like" to the authenticated user's ID.
  - Check returned array from ".filter" with ".length"
  - If length of array is greater than 0, then the user's ID is already stored
  - This means the user has already liked the post.
*/
