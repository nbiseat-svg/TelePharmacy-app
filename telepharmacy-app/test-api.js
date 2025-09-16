const axios = require('axios');

async function testAPI() {
  try {
    console.log('Testing TelePharmacy API...');
    
    // Test medications endpoint
    const medicationsResponse = await axios.get('http://localhost:5000/api/medications');
    console.log('Medications:', medicationsResponse.data);
    
    // Test consultations endpoint
    const consultationsResponse = await axios.get('http://localhost:5000/api/consultations');
    console.log('Consultations:', consultationsResponse.data);
    
    console.log('API tests completed successfully!');
  } catch (error) {
    console.error('API test failed:', error.message);
  }
}

testAPI();