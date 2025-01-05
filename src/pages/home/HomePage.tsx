import HomeStreamCard from "@/pages/home/components/HomeStreamCard.tsx";
import ShowMoreDivider from "@/pages/home/components/ShowMoreDivider.tsx";
import { useEffect, useState } from "react";
import CategoryCard from "@/pages/home/components/CategoryCard.tsx";
import { getCategory, getListStream } from "./api/homeApi";
import { Stream } from "@/types/stream.ts";
import { LoadingAnimation } from "@/components/LoadingAnimation.tsx";
import { Category } from "@/types/category.ts";
import HomeVideoCard from "@/pages/home/components/HomeVideoCard.tsx";

export default function HomePage() {
  const [isShowMore, setIsShowMore] = useState(false);
  const [isShowMoreSection2, setIsShowMoreSection2] = useState(false);
  const [streams, setStreams] = useState<Stream[]>([]);
  const [previousStream, setPreviousStream] = useState<Stream[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
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
      const previousStreamData = await getListStream({
        state: "ended",
        limit: 10,
      });
      setPreviousStream(previousStreamData.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching streams:", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const data = await getCategory();
      console.log("Data:", data.data);
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchStreams();
    fetchCategories();
  }, []);

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
        {streams.length === 0 ? (
          <div className={"h-[200px] flex items-center justify-center"}>
            Chưa có sự kiện trực tiếp nào
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-4">
            {streams.slice(0, 5).map((stream) => (
              <HomeStreamCard key={stream.id} streamData={stream} />
            ))}
          </div>
        )}
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
        <h1 className={"text-2xl font-bold"}>Các luồng trực tiếp trước đây</h1>
        <div className="grid grid-cols-5 gap-4">
          {previousStream.slice(0, 5).map((stream) => (
            <HomeVideoCard streamData={stream} key={stream.id} />
          ))}
        </div>
        {isShowMoreSection2 && (
          <div className="grid grid-cols-5 gap-4">
            {previousStream.slice(5, 11).map((stream) => (
              <HomeVideoCard streamData={stream} key={stream.id} />
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
          {categories.map((data, index) => (
            <CategoryCard key={index} category={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
