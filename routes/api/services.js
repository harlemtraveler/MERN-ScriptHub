const express = require('express');
const router = express.Router();

// @routes GET api/services/test
// @desc   Tests services route
// @access Public
router.get('/test', (req, res) => res.json({
  msg: 'Services Works!'
}));

module.exports = router;
