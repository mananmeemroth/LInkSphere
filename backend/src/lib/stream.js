import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

// Sanity check - verify keys are loaded (without exposing secrets)
console.log("🔍 Stream API Configuration Check:");
console.log("  STREAM_API_KEY:", apiKey ? `✅ Set (${apiKey.substring(0, 8)}...)` : "❌ Missing");
console.log("  STREAM_API_SECRET:", apiSecret ? "✅ Set" : "❌ Missing");

if (!apiKey || !apiSecret) {
  console.error("❌ Stream API key or Secret is missing");
  console.error("Please set STREAM_API_KEY and STREAM_API_SECRET in your backend/.env file");
  console.error("Make sure to restart your server after updating .env");
} else {
  console.log("✅ Stream API credentials found");
}

// Only create client if API keys are available
let streamClient = null;
if (apiKey && apiSecret) {
  try {
    streamClient = StreamChat.getInstance(apiKey, apiSecret);
    console.log("✅ Stream Chat client initialized successfully");
  } catch (error) {
    console.error("❌ Failed to initialize Stream client:", error);
  }
} else {
  console.error("❌ Cannot initialize Stream client - missing API credentials");
}

export const upsertStreamUser = async (userData) => {
  try {
    if (!streamClient) {
      console.error("Stream client is not initialized. Check your API keys.");
      return null;
    }
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
    return null;
  }
};

export const generateStreamToken = (userId) => {
  try {
    if (!streamClient) {
      throw new Error("Stream client is not initialized. Please check STREAM_API_KEY and STREAM_API_SECRET in your .env file");
    }

    if (!apiKey || !apiSecret) {
      throw new Error("Stream API key or secret is not configured");
    }

    if (!userId) {
      throw new Error("User ID is required to generate token");
    }

    // ensure userId is a string
    const userIdStr = userId.toString();
    const token = streamClient.createToken(userIdStr);
    
    if (!token) {
      throw new Error("Failed to generate Stream token");
    }
    
    return token;
  } catch (error) {
    console.error("Error generating Stream token:", error);
    throw error; // Re-throw so the controller can handle it
  }
};