import HomeStreamCard from "@/pages/home/components/HomeStreamCard.tsx";
import ShowMoreDivider from "@/pages/home/components/ShowMoreDivider.tsx";
import { useState } from "react";

export default function HomePage() {
  const [isShowMore, setIsShowMore] = useState(false);
  const [isShowMoreSection2, setIsShowMoreSection2] = useState(false);
  const handleShowMore = () => {
    setIsShowMore(!isShowMore);
  };
  const handleShowMoreSection2 = () => {
    setIsShowMoreSection2(!isShowMoreSection2);
  };

  return (
    <>
      <div className={"h-full w-full flex flex-col p-5"}>
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
          <ShowMoreDivider onShowMore={handleShowMore}></ShowMoreDivider>
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
          ></ShowMoreDivider>
        </div>
      </div>
    </>
  );
}
