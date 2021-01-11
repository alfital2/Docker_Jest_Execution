const fs = require('fs');
const axios = require('axios');
const { pass, fail } = require('create-jest-runner');
const URL = 'http://localhost:3000';

module.exports = async ({ testPath }) => {
  const contents = fs.readFileSync(testPath, 'utf8');
  const start = Date.now();
  
  const res = await axios
      .post(URL, {
        fileName: 'test.spec.js',
        testText: contents,
      })

      const end = Date.now();

      return fail({
        start,
        end,
        test: {
          path: testPath,
          title: 'failed'
        },
      });

  
};
