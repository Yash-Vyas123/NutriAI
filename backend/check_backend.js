const axios = require('axios');

async function checkBackend() {
  try {
    const res = await axios.get('https://nutriai-n61b.onrender.com/api/ping');
    console.log('Status:', res.status);
    console.log('Headers:', res.headers);
    console.log('Data:', res.data);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

checkBackend();
