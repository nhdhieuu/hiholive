import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { ChatSidebar } from "@/pages/streaming/components/ChatSidebar.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useSocketStore } from "@/stores/useSocket";
import { StreamDetailResponseData } from "@/types/streamDetail.ts";
import { getStreamDetail } from "./api/streamApi";
import { LoadingAnimation } from "@/components/LoadingAnimation.tsx";
import { ViewCount } from "./components/ViewCount";
import StreamVideoJS from "@/components/StreamVideoJS.tsx";

export default function StreamingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  /*const playerRef = useRef<Player | null>(null);*/
  const { socket } = useSocketStore();
  const { id } = useParams<{ id: string }>();
  const [streamDetail, setStreamDetail] =
    useState<StreamDetailResponseData | null>(null);
  const [videoSources, setVideoSources] = useState([
    {
      src: `https://content.hiholive.fun/${id}/master.m3u8`,
      type: "application/x-mpegURL",
      label: "auto",
    },
  ]);
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

  fetch(`https://content.hiholive.fun/${id}/master.m3u8`).then(async (r) => {
    const data = await r.text();
    data.split("\n").forEach((r) => {
      if (r.startsWith("index-")) {
        console.log(r);
      }
    });
  });
  /*const videoSources = [
    {
      src: `https://content.hiholive.fun/${id}/master.m3u8`,
      type: "application/x-mpegURL",
      label: "auto",
    },
    {
      src: `https://content.hiholive.fun/${id}/index-1080p60.m3u8`,
      type: "application/x-mpegURL",
      label: "1080",
    },
    {
      src: `https://content.hiholive.fun/${id}/index-720p60.m3u8`,
      type: "application/x-mpegURL",
      label: "720",
    },
  ];*/
  useEffect(() => {
    if (id) {
      fetchStreamDetail(id);
      fetch(`https://content.hiholive.fun/${id}/master.m3u8`).then(
        async (r) => {
          const data = await r.text();
          const sources = [
            {
              src: `https://content.hiholive.fun/${id}/master.m3u8`,
              type: "application/x-mpegURL",
              label: "auto",
            },
          ];
          data.split("\n").forEach((line) => {
            if (line.startsWith("index-")) {
              const label = line.match(/index-(\d+p\d+)/)?.[1] || "unknown";
              sources.push({
                src: `https://content.hiholive.fun/${id}/${line}`,
                type: "application/x-mpegURL",
                label,
              });
            }
          });
          setVideoSources(sources);
        },
      );
    }
  }, [id]);
  useEffect(() => {
    if (socket) {
      socket.emit("stream:view", id, (data: unknown) => {
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
            {/*<VideoJSPlayer
              options={videoJsOptions}
              onReady={handlePlayerReady}
            />*/}
            <StreamVideoJS sources={videoSources} />
            {/*<TestVideoPlayer id={id} />*/}
          </div>

          {/* Channel info section */}
          <div className="p-4 ">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                {/* Avatar and live indicator */}
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={
                        streamDetail?.channel?.image?.url ||
                        "https://placehold.co/600x400?text=hiholive"
                      }
                    />
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
                      navigate(`/channel/${streamDetail?.channel.userName}`);
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
                  <ViewCount streamId={streamDetail?.id || ""} />
                </div>
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
