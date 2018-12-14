const express = require('express');
const mongoose = require('mongoose');

const app = express();

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('[+] MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send(
  'Hello, World!'
));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(
  `[*] Server running on port: ${PORT}`
));
