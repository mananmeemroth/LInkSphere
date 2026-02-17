import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    console.log("getStreamToken called");
    console.log("req.user:", req.user ? "exists" : "missing");
    
    if (!req.user) {
      console.error("No user in request");
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Use _id (MongoDB) or id (Mongoose virtual)
    const userId = req.user._id || req.user.id;
    
    if (!userId) {
      console.error("No user ID found in request user object");
      return res.status(401).json({ message: "User ID not found" });
    }

    console.log("Generating token for user:", userId);
    const token = generateStreamToken(userId);

    if (!token) {
      console.error("Token generation returned null/undefined");
      return res.status(500).json({ 
        message: "Failed to generate chat token. Please check Stream API configuration." 
      });
    }

    console.log("Token generated successfully");
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in getStreamToken controller:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({ 
      message: error.message || "Failed to generate chat token. Please check Stream API configuration." 
    });
  }
}