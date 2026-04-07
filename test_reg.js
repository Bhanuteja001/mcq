const axios = require('axios');

async function test() {
  try {
    const resp = await axios.post('http://localhost:3000/api/auth/register', {
      username: 'admin_final_v3',
      email: 'admin_v3@final.com',
      password: 'password123',
      adminSecret: 'admin123'
    });
    console.log('SUCCESS:', JSON.stringify(resp.data.user, null, 2));
  } catch (error) {
    console.error('ERROR:', error.response?.data || error.message);
  }
}

test();
