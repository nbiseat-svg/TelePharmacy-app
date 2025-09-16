// Simple test to verify the server is working
const axios = require('axios');

async function testServer() {
  try {
    console.log('Testing TelePharmacy Server...');
    
    // Test root endpoint
    const rootResponse = await axios.get('http://localhost:5000/');
    console.log('Root endpoint:', rootResponse.data);
    
    // Test patients endpoint
    const patientsResponse = await axios.get('http://localhost:5000/api/patients');
    console.log('Patients endpoint:', patientsResponse.data.length, 'patients found');
    
    // Test prescriptions endpoint
    const prescriptionsResponse = await axios.get('http://localhost:5000/api/prescriptions');
    console.log('Prescriptions endpoint:', prescriptionsResponse.data.length, 'prescriptions found');
    
    console.log('All tests passed!');
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

// Run the test
testServer();