import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VideoJS } from "@/components/VideoJSPlayer.tsx";
import videojs from "video.js";
import { useEffect, useRef, useState } from "react";
import Player from "video.js/dist/types/player";
import { ChatSidebar } from "@/pages/streaming/components/ChatSidebar.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useSocketStore } from "@/stores/useSocket";
import { Users } from "lucide-react";
import { StreamDetailResponseData } from "@/types/streamDetail.ts";
import { getStreamDetail } from "./api/streamApi";
import { LoadingAnimation } from "@/components/LoadingAnimation.tsx";

export default function StreamingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const playerRef = useRef<Player | null>(null);
  const { socket } = useSocketStore();
  const { id } = useParams<{ id: string }>();
  const [streamDetail, setStreamDetail] =
    useState<StreamDetailResponseData | null>(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    liveui: true,
    sources: [
      {
        src: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.mp4/.m3u8",
        type: "application/x-mpegURL",
      },
    ],
    controlBar: {
      progressControl: false, // You can customize controlBar properties
      remainingTimeDisplay: false,
      durationDisplay: false,
      currentTimeDisplay: false,
      volumePanel: true,
      playToggle: true,
      fullscreenToggle: true,
    },
  };

  // Type 'player' parameter explicitly as 'Player'
  const handlePlayerReady = (player: Player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };
  const fetchStreamDetail = async (id: string) => {
    try {
      const data = await getStreamDetail(id);
      console.log("Data:", data);
      setStreamDetail(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching streams:", error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchStreamDetail(id);
    }
  }, []);
  useEffect(() => {
    if (socket) {
      socket.emit("stream:view", "DTHXLnQHZ1PbtV2", (data: unknown) => {
        console.log("Join Streamchat successfully", data);
      });
    }
  }, [socket, id]);

  if (loading) {
    return <LoadingAnimation />;
  }
  return (
    <div className="max-h-screen">
      {/* Main content area */}
      <div className="flex ">
        {/* Stream and info section */}
        <div className="flex-1 flex flex-col">
          {/* Video player area */}
          <div className="w-full">
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          </div>

          {/* Channel info section */}
          <div className="p-4 ">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                {/* Avatar and live indicator */}
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>CH</AvatarFallback>
                  </Avatar>
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-semibold bg-red-500 text-white rounded">
                    LIVE
                  </span>
                </div>

                {/* Stream info */}
                <div className="space-y-1 w-fit">
                  <h1
                    className="text-xl font-semibold hover:underline"
                    onClick={() => {
                      navigate("/channel");
                    }}
                  >
                    {streamDetail?.channel?.displayName || "Unknown Channel"}
                  </h1>
                  <p className="text-sm ">
                    {streamDetail?.title || "Untitled"}
                  </p>
                  <p className="text-sm ">
                    {" "}
                    {streamDetail?.category?.name || "Unknown Category"}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm">
                  <Users className="w-4 h-4" />
                  <span>34</span>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Follow
                </Button>
              </div>
            </div>

            {/* About section */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">
                Giới thiệu {streamDetail?.channel?.displayName}
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium">2.6K followers</span>
              </div>
              <p className="text-sm  mb-4">
                Cao Hoàng is a professional League of Legends player from
                Vietnam. He is currently playing for T1 in the LCK.
              </p>
            </div>
          </div>
        </div>

        {/* Chat sidebar */}
        <ChatSidebar streamId={streamDetail?.id || ""}></ChatSidebar>
      </div>
    </div>
  );
}
