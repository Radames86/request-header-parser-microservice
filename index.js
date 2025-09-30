
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors()); 
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(`
    <h1>Request Header Parser Microsevice</h1>
    <p>Try <a href="/api/whoami">/api/whoami</a></p>
    `);
});


app.get('/api/whoami', (req, res) => {
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '')
    .split(',')[0]
    .trim();

  res.json({
    ipaddress: ip,
    language: req.headers['accept-language'] || '',
    software: req.headers['user-agent'] || ''
  });
});


 app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
