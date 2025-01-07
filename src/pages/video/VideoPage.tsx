import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { StreamDetailResponseData } from "@/types/streamDetail.ts";
import { getStreamDetail } from "../streaming/api/streamApi";
import HlsPlayer from "@/components/VideoPlayer.tsx";

export function VideoPage() {
  const [streamDetail, setStreamDetail] =
    useState<StreamDetailResponseData | null>(null);
  const { id } = useParams<{ id: string }>();
  const fetchStreamDetail = async (id: string) => {
    try {
      const data = await getStreamDetail(id);
      console.log("Data:", data);
      setStreamDetail(data.data);
    } catch (error) {
      console.error("Error fetching streams:", error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchStreamDetail(id);
    }
  }, []);
  const navigate = useNavigate();
  return (
    <div className="max-h-screen">
      {/* Main content area */}
      <div className="flex ">
        {/* Stream and info section */}
        <div className="flex-1 flex flex-col">
          {/* Video player area */}
          <div className="w-full">
            <HlsPlayer
              src={`https://content.hiholive.fun/${id}/master.m3u8`} // URL của video HLS với id
              poster="https://placehold.co/600x400?text=Hiholive" // Hình ảnh hiển thị trước khi phát
              width="100%"
              height="1080px"
              controls={true}
            />
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
                        "https://placehold.co/600x400?text=Eduhub"
                      }
                    />
                    <AvatarFallback>CH</AvatarFallback>
                  </Avatar>
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
            </div>

            {/* About section */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">
                Giới thiệu {streamDetail?.channel?.displayName}
              </h2>
              <p className="text-sm  mb-4">
                Cao Hoàng is a professional League of Legends player from
                Vietnam. He is currently playing for T1 in the LCK.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
