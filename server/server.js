'use strict';
const express = require('express');
const fs = require('fs');
const jest = require('jest');

const PORT = 3000;
const HOST = '0.0.0.0';
const TEST_RESULT_FILE = 'res.json';

const app = express();
app.use(express.json());

const uuid = function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


app.post('/', async (req, res) => {   
  const uniqueFileName = uuid()+'.spec.js';
    fs.writeFileSync(uniqueFileName, req.body.testText, {
        flag: 'w+',
      });
      await jest.run(
        // eslint-disable-next-line max-len
        ` --json --outputFile=${TEST_RESULT_FILE}  --findRelatedTests ${uniqueFileName} `,
    );

    const testResult = fs.readFileSync(TEST_RESULT_FILE, 'utf8');

    fs.unlinkSync(TEST_RESULT_FILE);
    fs.unlinkSync(uniqueFileName);
    res.send(testResult);
  }
);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
