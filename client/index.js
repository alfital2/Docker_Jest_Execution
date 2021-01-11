const axios = require('axios');
const URL = 'http://localhost:3000';

async function testConnection(){
    const res = await axios.post(URL);

    console.log(res.data);
}

testConnection();