import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchStreamCard from "@/pages/search/components/SearchStreamCard.tsx";
import SearchChannel from "@/pages/search/components/SearchChannel.tsx";
import SearchPreviousVideo from "@/pages/search/components/SearchPreviousVideo.tsx";
import {
  getListCategorySearch,
  getListChannelSearch,
  getListStreamSearch,
} from "@/pages/search/api/searchApi.ts";
import { Stream } from "@/types/stream.ts";
import { LoadingAnimation } from "@/components/LoadingAnimation.tsx";
import { Channel } from "@/types/channel.ts";
import { Category } from "@/types/category.ts";
import { SearchCategoryCard } from "@/pages/search/components/SearchCategoryCard.tsx";

export default function SearchPage() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<Stream[]>([]);
  const [channelResults, setChannelResults] = useState<Channel[]>([]);
  const [categoryResults, setCategoryResults] = useState<Category[]>([]);
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
  const fetchCategoryResults = async () => {
    const categoryResponse = await getListCategorySearch({
      name: search,
    });
    if (categoryResponse) {
      console.log("category Response:", categoryResponse);
      setCategoryResults(categoryResponse.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchSearchResults();
    fetchChannelResults();
    fetchCategoryResults();
  }, [search]);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 space-y-6">
      {searchResults.length === 0 &&
      channelResults.length === 0 &&
      categoryResults.length === 0 ? (
        <div>
          Không tìm thấy kết quả nào cho {search}. Đảm bảo rằng bạn không viết
          sai chính tả từ nào hoặc bạn hãy thử từ khóa khác.
        </div>
      ) : (
        <>
          {/* Live Channels Section */}
          {searchResults.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">
                Các kênh trực tiếp được gắn thẻ {search}
              </h2>
              {searchResults.map((stream) => (
                <SearchStreamCard key={stream.id} data={stream} />
              ))}
            </section>
          )}

          {/* Featured Channel */}
          {channelResults.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Kênh</h2>
              {channelResults.map((channel) => (
                <SearchChannel key={channel.id} channel={channel} />
              ))}
            </section>
          )}

          {/* Categories Section */}
          {categoryResults.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Danh mục</h2>
              {categoryResults.map((category) => (
                <SearchCategoryCard key={category.id} data={category} />
              ))}
            </section>
          )}

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
