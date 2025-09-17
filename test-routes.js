const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testRoutes() {
  console.log('🧪 Testing CivicSpot API Routes...\n');

  const tests = [
    // Health check
    { method: 'GET', url: '/health', name: 'Health Check' },
    
    // Public routes
    { method: 'GET', url: '/api/reports', name: 'Get Reports (Public)' },
    { method: 'GET', url: '/api/campaigns', name: 'Get Campaigns (Public)' },
    { method: 'GET', url: '/api/posts', name: 'Get Posts (Public)' },
    { method: 'GET', url: '/api/posts/test', name: 'Posts Test Route' },
    { method: 'GET', url: '/api/rewards/leaderboard', name: 'Leaderboard (Public)' },
    
    // Auth routes (should work without token)
    { method: 'POST', url: '/api/auth/login', name: 'Login Endpoint', 
      data: { email: 'test@test.com', password: 'test' }, expectError: true },
  ];

  for (const test of tests) {
    try {
      const config = {
        method: test.method,
        url: `${BASE_URL}${test.url}`,
        timeout: 5000
      };
      
      if (test.data) {
        config.data = test.data;
      }

      const response = await axios(config);
      console.log(`✅ ${test.name}: ${response.status} - ${response.statusText}`);
      
      if (test.url === '/health') {
        console.log(`   Response: ${JSON.stringify(response.data)}`);
      }
      
    } catch (error) {
      if (test.expectError) {
        console.log(`✅ ${test.name}: Expected error - ${error.response?.status || 'Connection Error'}`);
      } else {
        console.log(`❌ ${test.name}: ${error.response?.status || 'Connection Error'} - ${error.message}`);
      }
    }
  }

  console.log('\n📋 Route Testing Complete!');
  console.log('\n💡 To test authenticated routes:');
  console.log('1. Register/login to get a token');
  console.log('2. Add Authorization header: Bearer <token>');
  console.log('\n📖 See API_ROUTES.md for complete documentation');
}

// Only run if called directly
if (require.main === module) {
  testRoutes().catch(console.error);
}

module.exports = { testRoutes };