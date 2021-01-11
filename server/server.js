'use strict';
const express = require('express');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();
app.post('/', (req, res) => {
      res.send("post req recieved");
  });

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
