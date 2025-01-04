import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SearchStreamCard from "@/pages/search/components/SearchStreamCard.tsx";
import SearchChannel from "@/pages/search/components/SearchChannel.tsx";
import SearchPreviousVideo from "@/pages/search/components/SearchPreviousVideo.tsx";
import {
  getListChannelSearch,
  getListStreamSearch,
} from "@/pages/search/api/searchApi.ts";
import { Stream } from "@/types/stream.ts";
import { LoadingAnimation } from "@/components/LoadingAnimation.tsx";
import { Channel } from "@/types/channel.ts";

export default function SearchPage() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<Stream[]>([]);
  const [channelResults, setChannelResults] = useState<Channel[]>([]);
  const query = new URLSearchParams(location.search);
  const search = query.get("q") || "";

  const fetchSearchResults = async () => {
    const searchRepsonse = await getListStreamSearch({ title: search });
    if (searchRepsonse) {
      console.log("Search Response:", searchRepsonse);
      setSearchResults(searchRepsonse.data);
      setLoading(false);
    }
  };
  const fetchChannelResults = async () => {
    const channelResponse = await getListChannelSearch({
      userName: search.toLowerCase(),
    });
    if (channelResponse) {
      console.log("Channel Response:", channelResponse);
      setChannelResults(channelResponse.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSearchResults();
    fetchChannelResults();
  }, [search]);

  if (loading) {
    return <LoadingAnimation />;
  }
  return (
    <div className="min-h-screen bg-background text-foreground p-4 space-y-6">
      {searchResults.length === 0 ? (
        <div>
          Không tìm thấy kết quả nào cho {search}. Đảm bảo rằng bạn không viết
          sai chính tả từ nào hoặc bạn hãy thử từ khóa khác.
        </div>
      ) : (
        <>
          {/* Live Channels Section */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">
              Các kênh trực tiếp được gắn thẻ {search}
            </h2>
            {searchResults.map((stream) => (
              <SearchStreamCard key={stream.id} data={stream} />
            ))}
          </section>

          {/* Featured Channel */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Kênh</h2>
            {channelResults.map((channel) => (
              <SearchChannel key={channel.id} channel={channel} />
            ))}
          </section>

          {/* Categories Section */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Danh mục</h2>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4"></div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          {/* Recent Videos */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Video trước đây</h2>
            <SearchPreviousVideo />
            <SearchPreviousVideo />
            <SearchPreviousVideo />
          </section>
        </>
      )}
    </div>
  );
}
