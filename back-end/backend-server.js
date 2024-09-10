
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 9999;

app.use(cors());
app.use(bodyParser.json());
app.post('/', (req, res) => {
  console.log('Received data:', req.body);
  res.send(`NODE.JS server ito TANGINAMO, ang sinend mo ay ${req.body.message}`);
});


app.listen(port, () => {
  console.log(`Node.js is running on http://localhost:${port}`);
});
