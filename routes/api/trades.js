const express = require('express');
const router = express.Router();

// @routes GET api/trades/test
// @desc   Tests trades route
// @access Public
router.get('/test', (req, res) => res.json({
  msg: 'Trades Works!'
}));

module.exports = router;
