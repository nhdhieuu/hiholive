import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "video.js/dist/video-js.css";
import { Stream } from "@/types/stream.ts";
import HlsPlayer from "@/components/VideoPlayer.tsx";

interface HomeVideoCardProps {
  streamData: Stream;
}

export default function HomeVideoCard({ streamData }: HomeVideoCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  /*const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<Player | null>(null);*/

  return (
    <Card
      className="w-full overflow-hidden bg-background hover:bg-gray-50"
      onClick={() => {
        navigate(`/video/${streamData.id}`);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Stream Preview Section */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          <Eye className="h-4 w-4" />
          <span>{streamData.currentView} viewers</span>
        </div>
        {isHovered ? (
          <div className="absolute inset-0">
            <HlsPlayer
              src={`https://content.hiholive.fun/${streamData.id}/master.m3u8`} // URL của video HLS với id
              poster="https://placehold.co/600x400?text=Hiholive"
              height="100%"
              controls={false}
            />
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
            <AvatarImage
              src={
                streamData?.channel?.image?.url ||
                "https://placehold.co/600x400?text=Hiholive"
              }
            />
          </Avatar>
          <div className="flex-1">
            <h3 className="line-clamp-1 font-semibold">{streamData.title}</h3>
            <p className="text-sm text-muted-foreground">
              {streamData.channel.displayName}
            </p>
            <p className="text-sm font-bold text-muted-foreground">
              {streamData.category?.name || "Unknown Category"}
            </p>
            <p className="text-sm text-muted-foreground"></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
