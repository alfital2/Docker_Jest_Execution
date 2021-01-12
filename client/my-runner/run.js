const fs = require('fs');
const axios = require('axios');
const { pass, fail } = require('create-jest-runner');
const URL = 'http://localhost:3000';

module.exports = async ({ testPath }) => {
  const contents = fs.readFileSync(testPath, 'utf8');
  const start = Date.now();
  return await axios
  .post(URL, {
    fileName: 'test.spec.js',
    testText: contents,
  })
  .then((res) => {
    return res.data;
  })
  .then((result) => {
    const end = Date.now();

    if (result.success) {
      return pass({
        start,
        end,
        test: {
          path: testPath,
        },
      });
    }
    const errorMessage = result.testResults[0].message;
    return fail({
      start,
      end,
      test: {
        path: testPath,
        errorMessage,
        title: 'failed',
      },
    });
  })
  .catch((error) => {
    return error;
  });
  
};
