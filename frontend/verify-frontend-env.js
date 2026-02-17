// Quick verification script to check frontend environment variables
// Run this with: node verify-frontend-env.js

// Note: This script runs in Node.js, so it can't access Vite's import.meta.env
// But it can check if the .env file exists and has the right format

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');

console.log('\n🔍 Frontend Environment Variables Check\n');
console.log('='.repeat(50));

if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found in frontend directory');
  console.log('\n📝 Create frontend/.env with:');
  console.log('   VITE_STREAM_API_KEY=your_api_key_here');
  console.log('\n⚠️  Make sure it matches STREAM_API_KEY in backend/.env');
} else {
  console.log('✅ .env file exists');
  
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const hasStreamKey = envContent.includes('VITE_STREAM_API_KEY');
  
  if (hasStreamKey) {
    const match = envContent.match(/VITE_STREAM_API_KEY=(.+)/);
    if (match && match[1] && match[1].trim() !== 'your_stream_api_key_here') {
      const keyValue = match[1].trim();
      console.log('✅ VITE_STREAM_API_KEY is set');
      console.log(`   Value: ${keyValue.substring(0, 8)}...${keyValue.substring(keyValue.length - 4)}`);
      console.log(`   Length: ${keyValue.length} characters`);
    } else {
      console.log('⚠️  VITE_STREAM_API_KEY is set but has placeholder value');
      console.log('   Update it with your actual Stream API key');
    }
  } else {
    console.log('❌ VITE_STREAM_API_KEY not found in .env file');
    console.log('   Add: VITE_STREAM_API_KEY=your_api_key_here');
  }
}

console.log('\n' + '='.repeat(50));
console.log('\n📝 Remember:');
console.log('1. VITE_STREAM_API_KEY must match STREAM_API_KEY from backend/.env');
console.log('2. Restart your frontend dev server after updating .env');
console.log('3. Vite environment variables start with VITE_ prefix\n');
