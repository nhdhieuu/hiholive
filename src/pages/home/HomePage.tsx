import HomeStreamCard from "@/pages/home/components/HomeStreamCard.tsx";
import ShowMoreDivider from "@/pages/home/components/ShowMoreDivider.tsx";
import { useEffect, useState } from "react";
import CategoryCard from "@/pages/home/components/CategoryCard.tsx";
import { getListStream } from "./api/homeApi";
import { Stream } from "@/types/stream.ts";
import { LoadingAnimation } from "@/components/LoadingAnimation.tsx";

export default function HomePage() {
  const [isShowMore, setIsShowMore] = useState(false);
  const [isShowMoreSection2, setIsShowMoreSection2] = useState(false);
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);
  const handleShowMore = () => {
    setIsShowMore(!isShowMore);
  };
  const handleShowMoreSection2 = () => {
    setIsShowMoreSection2(!isShowMoreSection2);
  };
  const fetchStreams = async () => {
    try {
      const data = await getListStream({ state: "running", limit: 10 });
      console.log("Data:", data);
      setStreams(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching streams:", error);
    }
  };
  useEffect(() => {
    fetchStreams();
  }, []);
  const categoryMockData = [
    {
      title: "League of Legends",
      viewers: 102000,
      tags: ["RPG", "Strategy"],
      imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/21779-144x192.jpg",
    },
    {
      title: "Just Chatting",
      viewers: 102000,
      tags: ["RPG", "Strategy"],
      imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/509658-188x250.jpg",
    },

    {
      title: "Valorant",
      viewers: 102000,
      tags: ["Shooting", "Fps"],
      imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/516575-188x250.jpg",
    },
    {
      title: "NARAKA: BLADEPOINT",
      viewers: 102000,
      tags: ["Shooting", "Fps"],
      imageUrl:
        "https://static-cdn.jtvnw.net/ttv-boxart/515474_IGDB-188x250.jpg",
    },
    {
      title: "Counter-Strike",
      viewers: 102000,
      tags: ["Shooting", "Fps"],
      imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/32399-188x250.jpg",
    },
    {
      title: "Dota 2",
      viewers: 102000,
      tags: ["Shooting", "Fps"],
      imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/29595-188x250.jpg",
    },
    {
      title: "Teamfight Tactics",
      viewers: 102000,
      tags: ["Shooting", "Fps"],
      imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/513143-188x250.jpg",
    },
    {
      title: "EA Sports FC 25",
      viewers: 102000,
      tags: ["Shooting", "Fps"],
      imageUrl:
        "https://static-cdn.jtvnw.net/ttv-boxart/2011938005_IGDB-188x250.jpg",
    },
  ];
  if (loading) {
    return <LoadingAnimation />;
  }
  return (
    <div className={" h-full max-w-full flex flex-col p-5"}>
      {/*SECTION*/}
      <div className={"flex flex-col gap-2 mb-1"}>
        <h1 className={"text-2xl font-bold"}>
          Các kênh trực tiếp chúng tôi nghĩ bạn sẽ thích
        </h1>
        <div className="grid grid-cols-5 gap-4">
          {streams.slice(0, 5).map((stream) => (
            <HomeStreamCard key={stream.id} streamData={stream} />
          ))}
        </div>
        {isShowMore && (
          <div className="grid grid-cols-5 gap-4">
            {streams.slice(5, 11).map((stream) => (
              <HomeStreamCard key={stream.id} streamData={stream} />
            ))}
          </div>
        )}
        {streams.length > 5 && (
          <ShowMoreDivider
            onShowMore={handleShowMore}
            isShowMore={isShowMore}
          ></ShowMoreDivider>
        )}
      </div>
      {/*SECTION*/}
      <div className={"flex flex-col gap-2 mb-1"}>
        <h1 className={"text-2xl font-bold"}>League Of Legends</h1>
        <div className="grid grid-cols-5 gap-4">
          {streams.slice(0, 5).map((stream) => (
            <HomeStreamCard key={stream.id} streamData={stream} />
          ))}
        </div>
        {isShowMoreSection2 && (
          <div className="grid grid-cols-5 gap-4">
            {streams.slice(5, 11).map((stream) => (
              <HomeStreamCard key={stream.id} streamData={stream} />
            ))}
          </div>
        )}
        {streams.length > 5 && (
          <ShowMoreDivider
            onShowMore={handleShowMoreSection2}
            isShowMore={isShowMoreSection2}
          ></ShowMoreDivider>
        )}
      </div>
      {/*SECTION*/}
      <div className={"overflow-hidden w-full flex flex-col gap-2"}>
        <h1 className={"text-2xl font-bold"}>
          Các danh mục chúng tôi nghĩ bạn sẽ thích
        </h1>
        <div className="flex gap-4">
          {categoryMockData.map((data, index) => (
            <CategoryCard
              key={data.title || index} // Sử dụng `data.id` nếu có, nếu không dùng `index` như giải pháp dự phòng
              title={data.title}
              viewers={data.viewers}
              tags={data.tags}
              imageUrl={data.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
