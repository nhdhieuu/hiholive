import ChannelInfo from "./components/ChannelInfo.tsx";
import { useParams } from "react-router-dom";
import { getChannelByUsername } from "@/pages/channel/api/channelApi.ts";
import { useEffect, useState } from "react";
import { Channel } from "@/types/channel.ts";
import HomeVideoCard from "@/pages/home/components/HomeVideoCard.tsx";
import { getListStream } from "@/pages/home/api/homeApi.ts";
import { Stream } from "@/types/stream.ts";
import ShowMoreDivider from "@/pages/home/components/ShowMoreDivider.tsx";

export default function ChannelPage() {
  const { username } = useParams<{ username: string }>();
  const [channel, setChannel] = useState<Channel>();
  const [previousStream, setPreviousStream] = useState<Stream[]>([]);
  const [isShowMoreSection2, setIsShowMoreSection2] = useState(false);

  const fetchChannel = async (username: string) => {
    try {
      const response = await getChannelByUsername(username);
      console.log("Response", response);
      setChannel(response.data);
    } catch (error) {
      console.error("Fetch channel error:", error);
    }
  };
  const handleShowMoreSection2 = () => {
    setIsShowMoreSection2(!isShowMoreSection2);
  };
  const fetchStreams = async () => {
    try {
      const previousStreamData = await getListStream({
        state: "ended",
        channelId: channel?.id,
        limit: 10,
      });
      setPreviousStream(previousStreamData.data);
    } catch (error) {
      console.error("Error fetching streams:", error);
    }
  };
  useEffect(() => {
    if (username) {
      fetchChannel(username);
    }
  }, [username]);

  useEffect(() => {
    if (channel?.id) {
      fetchStreams();
    }
  }, [channel?.id]);

  return (
    <div>
      {/* Main Content */}
      <main className=" mx-auto px-4 py-2">
        <div className="relative">
          <div className="h-[500px] relative aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={
                channel?.panel?.url ||
                "https://placehold.co/600x400?text=Hiholive"
              }
              alt="Stream Thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-20 px-4">
            <ChannelInfo channel={channel} />
          </div>
        </div>
        <div className={"flex flex-col gap-2 mb-1 mt-[10px]"}>
          <h1 className={"text-2xl font-bold"}>
            Các luồng trực tiếp trước đây
          </h1>
          {previousStream.length === 0 ? (
            <div className={"h-[200px] flex items-center justify-center"}>
              Chưa có sự kiện trực tiếp nào
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-4">
              {previousStream.slice(0, 5).map((stream) => (
                <HomeVideoCard streamData={stream} key={stream.id} />
              ))}
            </div>
          )}
          {isShowMoreSection2 && (
            <div className="grid grid-cols-5 gap-4">
              {previousStream.slice(5, 11).map((stream) => (
                <HomeVideoCard streamData={stream} key={stream.id} />
              ))}
            </div>
          )}
          {previousStream.length > 5 && (
            <ShowMoreDivider
              onShowMore={handleShowMoreSection2}
              isShowMore={isShowMoreSection2}
            ></ShowMoreDivider>
          )}
        </div>
      </main>
    </div>
  );
}
