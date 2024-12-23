import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import { VideoJS } from "@/components/VideoJSPlayer.tsx";
import videojs from "video.js";
import { useRef } from "react";
import Player from "video.js/dist/types/player";
import { ChatSidebar } from "@/pages/streaming/components/ChatSidebar.tsx";

export default function StreamingPage() {
  const playerRef = useRef<Player | null>(null);

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
                <div className="space-y-1">
                  <h1 className="text-xl font-semibold">Cao Hoàng</h1>
                  <p className="text-sm ">Stream name</p>
                  <p className="text-sm ">League of Legends</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      "English",
                      "leagueoflegends",
                      "Tournament",
                      "League",
                      "pro",
                      "programing",
                      "ProfessionalGamer",
                      "EuropeanCircuit",
                      "europeanleague",
                      "Circuit",
                    ].map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-gray-300 hover:bg-gray-200 "
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm">
                  <Users className="w-4 h-4" />
                  <span>34</span>
                </div>
                <span className="text-sm text-zinc-400">0:53:31</span>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Follow
                </Button>
              </div>
            </div>

            {/* About section */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">About Cao Hoàng</h2>
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
        <ChatSidebar></ChatSidebar>
      </div>
    </div>
  );
}
