const fs = require('fs');
const axios = require('axios');
const { pass, fail } = require('create-jest-runner');
const URL = 'http://localhost:3000';

module.exports = async ({ testPath }) => {
  const start = Date.now();
  const contents = fs.readFileSync(testPath, 'utf8');
  const end = Date.now();

  const res = await axios.post(URL);
  const msg = 'communication works! '+res.data;

  return fail({ 
    start, 
    end, 
    test: {
        path: testPath ,
        errorMessage:msg
      } 
    });


};
