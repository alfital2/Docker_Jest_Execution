const fs = require('fs');
const axios = require('axios');
const { pass, fail } = require('create-jest-runner');
const URL = 'http://localhost:3000';

module.exports = async ({ testPath }) => {
  const contents = fs.readFileSync(testPath, 'utf8');
  const start = Date.now();

  const respone = await axios.post(URL, {testText: contents,})
  const result = respone.data;
  const end = Date.now();

  if (result.success) {
        return pass({start,end,test: {path: testPath}});
  }
  
  // test failed
  const errorMessage = result.testResults[0].message;
  return fail({start,end,test: {path: testPath,errorMessage,title: 'failed'}});

};
