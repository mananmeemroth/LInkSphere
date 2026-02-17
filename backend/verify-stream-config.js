// Quick verification script to check Stream API configuration
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

console.log("\n🔍 Stream API Configuration Verification\n");
console.log("=" .repeat(50));

if (apiKey) {
  console.log("✅ STREAM_API_KEY: Found");
  console.log(`   Value: ${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}`);
  console.log(`   Length: ${apiKey.length} characters`);
} else {
  console.log("❌ STREAM_API_KEY: Missing");
}

if (apiSecret) {
  console.log("✅ STREAM_API_SECRET: Found");
  console.log(`   Length: ${apiSecret.length} characters`);
} else {
  console.log("❌ STREAM_API_SECRET: Missing");
}

console.log("\n" + "=".repeat(50));

if (apiKey && apiSecret) {
  console.log("\n✅ All Stream API credentials are configured!");
  console.log("✅ Your chat should work now.");
  console.log("\n⚠️  Make sure to restart your backend server if you just added these.");
} else {
  console.log("\n❌ Stream API credentials are missing!");
  console.log("\n📝 Next steps:");
  console.log("1. Create or edit backend/.env file");
  console.log("2. Add these lines:");
  console.log("   STREAM_API_KEY=your_api_key_here");
  console.log("   STREAM_API_SECRET=your_api_secret_here");
  console.log("3. Get your keys from: https://getstream.io/dashboard/");
  console.log("4. Restart your backend server");
}

console.log("\n");
