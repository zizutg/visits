const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
  url: 'redis://localhost:6379'
});

client.set('visits', 0);

app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    res.send('Number of visits: ' + (visits || 0));
    client.set('visits', (parseInt(visits) || 0) + 1);
  });
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});