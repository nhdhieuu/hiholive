import ChannelInfo from "./components/ChannelInfo.tsx";
import ClipsSection from "./components/ClipSection";
import { useParams } from "react-router-dom";
import { getChannelByUsername } from "@/pages/channel/api/channelApi.ts";
import { useEffect, useState } from "react";
import { Channel } from "@/types/channel.ts";

export default function ChannelPage() {
  const { username } = useParams<{ username: string }>();
  const [channel, setChannel] = useState<Channel>();
  const fetchChannel = async (username: string) => {
    try {
      const response = await getChannelByUsername(username);
      console.log("Response", response);
      setChannel(response.data);
    } catch (error) {
      console.error("Fetch channel error:", error);
    }
  };

  useEffect(() => {
    if (username) {
      fetchChannel(username);
    }
  }, []);

  return (
    <div>
      {/* Main Content */}
      <main className=" mx-auto px-4 py-2">
        <div className="relative">
          <div className="h-[500px] relative aspect-video w-full overflow-hidden rounded-lg">
            <img
              src="https://placehold.co/600x400?text=Hiholive"
              alt="Stream Thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-20 px-4">
            <ChannelInfo channel={channel} />
          </div>
        </div>
        <ClipsSection />
      </main>
    </div>
  );
}
