const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// Models
const users = require('./routes/api/users');
const profile = require('./routes/api/profiles');
const posts = require('./routes/api/posts');
const jobs = require('./routes/api/jobs');
const services = require('./routes/api/services');
const trades = require('./routes/api/trades');

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB (mLab instance)
mongoose
  .connect(db)
  .then(() => console.log('[+] MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// app.get('/', (req, res) => res.send(
//   'Hello, World!'
// ));

// Use routes
app.use('/api/users', users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(
  `[*] Server running on port: ${PORT} 🚦`
));
