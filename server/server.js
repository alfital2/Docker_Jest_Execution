'use strict';
const express = require('express');
const fs = require('fs');
const jest = require('jest');

const PORT = 3000;
const HOST = '0.0.0.0';
const TEST_RESULT_FILE = 'res.json';

const app = express();
app.use(express.json());

app.post('/', async (req, res) => {   
    fs.writeFileSync(req.body.fileName, req.body.testText, {
        flag: 'w+',
      });
      await jest.run(
        // eslint-disable-next-line max-len
        ` --json --outputFile=${TEST_RESULT_FILE} --detectOpenHandles`,
    );

    const testResult = fs.readFileSync(TEST_RESULT_FILE, 'utf8');

    fs.unlinkSync(TEST_RESULT_FILE);
    fs.unlinkSync('test.spec.js');
    res.send(testResult);
  }
);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
