import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser.js";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

// ==============================
// Stream API Key (Vite)
// ==============================
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// Log once for debugging
if (typeof window !== "undefined") {
  console.log("🔍 Stream Frontend Config:");
  console.log(
    "  VITE_STREAM_API_KEY:",
    STREAM_API_KEY
      ? `✅ Found (${STREAM_API_KEY.substring(0, 8)}...)`
      : "❌ Missing"
  );
}

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const { authUser } = useAuthUser();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==============================
  // Fetch Stream token from backend
  // ==============================
  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenLoading,
  } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
    retry: 1,
  });

  useEffect(() => {
    let isMounted = true;

    const initChat = async () => {
      if (tokenLoading) return;

      // Basic validation
      if (!authUser || !targetUserId || !tokenData?.token) {
        if (tokenError) {
          console.error("Stream token error:", tokenError);
          toast.error("Failed to get chat token");
        }
        setLoading(false);
        return;
      }

      if (!STREAM_API_KEY) {
        console.error("❌ VITE_STREAM_API_KEY is missing");
        toast.error(
          "Stream API key not configured. Check frontend environment."
        );
        setLoading(false);
        return;
      }

      try {
        // Get singleton client
        const client = StreamChat.getInstance(STREAM_API_KEY);

        // Disconnect previous user if different
        const currentUserId = client.user?.id || client.userID;
        if (currentUserId && currentUserId !== authUser._id) {
          await client.disconnectUser();
        }

        // Connect user if not connected
        if (!client.userID) {
          await client.connectUser(
            {
              id: authUser._id,
              name: authUser.fullName,
              image: authUser.profilePic,
            },
            tokenData.token
          );
        }

        if (!isMounted) return;

        // Create deterministic channel ID
        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        if (isMounted) {
          setChatClient(client);
          setChannel(currChannel);
          setLoading(false);
        }
      } catch (error) {
        console.error("Stream initialization error:", error);
        toast.error(
          error.message || "Could not connect to chat. Please try again."
        );
        setLoading(false);
      }
    };

    initChat();

    return () => {
      isMounted = false;
    };
  }, [authUser, targetUserId, tokenData, tokenError, tokenLoading]);

  // ==============================
  // Video Call Handler
  // ==============================
  const handleVideoCall = () => {
    if (!channel) return;

    const callUrl = `${window.location.origin}/call/${channel.id}`;

    channel.sendMessage({
      text: `I've started a video call. Join me here: ${callUrl}`,
    });

    toast.success("Video call link sent!");
  };

  if (loading || !chatClient || !channel) {
    return <ChatLoader />;
  }

  // ==============================
  // Render Chat
  // ==============================
  return (
    <div className="h-[93vh]">
      {/* ✅ apiKey IS REQUIRED */}
      <Chat client={chatClient} apiKey={STREAM_API_KEY}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
