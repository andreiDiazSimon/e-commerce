
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 9999;

app.use(cors());
app.use(bodyParser.json());
app.post('/auth', (req, res) => {
  res.send(req.body);
});


app.listen(port, () => {
  console.log(`Node.js is running on http://localhost:${port}`);
});
