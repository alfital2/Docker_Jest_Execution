'use strict';
const express = require('express');
const fs = require('fs');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();
app.use(express.json());

app.post('/', (req, res) => {   
    fs.writeFileSync(req.body.fileName, req.body.testText, {
        flag: 'w+',
      });
    res.send('ok');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
