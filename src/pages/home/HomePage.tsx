import HomeStreamCard from "@/pages/home/components/HomeStreamCard.tsx";
import ShowMoreDivider from "@/pages/home/components/ShowMoreDivider.tsx";
import { useState } from "react";
import CategoryCard from "@/pages/home/components/CategoryCard.tsx";

export default function HomePage() {
  const [isShowMore, setIsShowMore] = useState(false);
  const [isShowMoreSection2, setIsShowMoreSection2] = useState(false);
  const handleShowMore = () => {
    setIsShowMore(!isShowMore);
  };
  const handleShowMoreSection2 = () => {
    setIsShowMoreSection2(!isShowMoreSection2);
  };
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

  return (
    <div className={" h-full max-w-full flex flex-col p-5"}>
      {/*SECTION*/}
      <div className={"flex flex-col gap-2"}>
        <h1 className={"text-2xl font-bold"}>
          Live channel we think you’ll like
        </h1>
        <div className={"flex gap-4 "}>
          <HomeStreamCard />
          <HomeStreamCard />
          <HomeStreamCard />
          <HomeStreamCard />
          <HomeStreamCard />
        </div>
        {isShowMore && (
          <div className={"flex gap-4"}>
            <HomeStreamCard />
            <HomeStreamCard />
            <HomeStreamCard />
            <HomeStreamCard />
            <HomeStreamCard />
          </div>
        )}
        <ShowMoreDivider
          onShowMore={handleShowMore}
          isShowMore={isShowMore}
        ></ShowMoreDivider>
      </div>
      {/*SECTION*/}
      <div className={"flex flex-col gap-2"}>
        <h1 className={"text-2xl font-bold"}>Just Chatting & IRL Streams</h1>
        <div className={"flex gap-4 "}>
          <HomeStreamCard />
          <HomeStreamCard />
          <HomeStreamCard />
          <HomeStreamCard />
          <HomeStreamCard />
        </div>
        {isShowMoreSection2 && (
          <div className={"flex gap-4"}>
            <HomeStreamCard />
            <HomeStreamCard />
            <HomeStreamCard />
            <HomeStreamCard />
            <HomeStreamCard />
          </div>
        )}
        <ShowMoreDivider
          onShowMore={handleShowMoreSection2}
          isShowMore={isShowMoreSection2}
        ></ShowMoreDivider>
      </div>
      {/*SECTION*/}
      <div className={"overflow-hidden w-full flex flex-col gap-2"}>
        <h1 className={"text-2xl font-bold"}>
          Categories we think you’ll like
        </h1>
        <div className={" flex gap-4 "}>
          {categoryMockData.map((data) => (
            <CategoryCard
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
