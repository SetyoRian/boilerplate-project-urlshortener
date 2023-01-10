require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const URL = require('url').URL;

// Basic Configuration
const port = process.env.PORT || 3000;
let shortUrl = 1;
let originUrl = null;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function (req, res) {
  let origin = req.body.url;
  originUrl = origin;
  let urlRegex = new RegExp (/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi)
  if(inputUrl.match(urlRegex)) {
    res.json({ original_url: origin, short_url: shortUrl });
  } else {
    res.json({"error":"invalid url"});
  }
});

app.get(`/api/shorturl/${shortUrl}`, function (req, res) {
  res.redirect(originUrl);
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
