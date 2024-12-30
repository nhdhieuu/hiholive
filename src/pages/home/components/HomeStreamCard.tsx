import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "video.js/dist/video-js.css";
import { Stream } from "@/types/stream.ts";
import VideoJSPlayer from "@/components/VideoJSPlayer.tsx";

interface HomeStreamCardProps {
  streamData: Stream;
}

export default function HomeStreamCard({ streamData }: HomeStreamCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  /*const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Player | null>(null);*/

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    muted: true,
    sources: [
      {
        src: "https://hls.hiholive.fun/DhiyDnSV31Fuwck/master.m3u8",
        type: "application/x-mpegURL",
      },
    ],
    controlBar: {
      progressControl: false, // You can customize controlBar properties
      remainingTimeDisplay: false,
      durationDisplay: false,
      currentTimeDisplay: false,
      pictureInPictureToggle: false,
      volumePanel: false,
      playToggle: false,
      fullscreenToggle: false,
    },
  };

  /*useEffect(() => {
    if (isHovered && videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        autoplay: true,
        controls: false,
        preload: "auto",
        muted: true,
        fluid: true,
        sources: [
          {
            src: "https://hls.hiholive.fun/DhiyDnSV31Fuwck/master.m3u8",
            type: "application/x-mpegURL",
          },
        ],
      });
    } else if (playerRef.current) {
      playerRef.current.dispose();
      playerRef.current = null;
    }

    // Cleanup when component unmounts
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [isHovered]);*/

  return (
    <Card
      className="w-full overflow-hidden bg-background hover:bg-gray-50"
      onClick={() => {
        navigate(`/streaming/${streamData.id}`);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Stream Preview Section */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-md bg-red-600 px-2 py-1 text-white">
          <div className="h-2 w-2 rounded-full bg-white" />
          LIVE
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          <Eye className="h-4 w-4" />
          <span>18K viewers</span>
        </div>
        {isHovered ? (
          <div className="absolute inset-0">
            <VideoJSPlayer options={videoJsOptions}></VideoJSPlayer>
          </div>
        ) : (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url('/placeholder.svg?height=250&width=400')`,
              backgroundColor: "#1a1a1a",
            }}
          >
            {/* Purple neon overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent" />
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>TW</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="line-clamp-1 font-semibold">{streamData.title}</h3>
            <p className="text-sm text-muted-foreground">
              {streamData.channel.displayName}
            </p>
            <p className="text-sm text-muted-foreground">
              {streamData.category?.name || "Unknown Category"}
            </p>
            <p className="text-sm text-muted-foreground">
              {streamData.currentView} người xem
            </p>
            <p className="text-sm text-muted-foreground">{streamData.id}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
