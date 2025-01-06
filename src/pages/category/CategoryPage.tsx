import { useParams } from "react-router-dom";
import {
  getCategory,
  getListStreamByCategory,
} from "@/pages/category/api/categoryApi.ts";
import { useEffect, useState } from "react";
import { Stream } from "@/types/stream.ts";
import SearchPreviousVideo from "@/pages/search/components/SearchPreviousVideo.tsx";
import { Category } from "@/types/category.ts";
import { LoadingAnimation } from "@/components/LoadingAnimation.tsx";

export const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [categoryLive, setCategoryLive] = useState<Stream[]>([]);
  const [categoryVideo, setCategoryVideo] = useState<Stream[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<Category>();
  const fetchCategory = async () => {
    try {
      const response = await getListStreamByCategory({
        categoryId: id,
        state: "running",
      });
      setCategoryLive(response.data);
      console.log("Category live:", categoryLive);
      const video = await getListStreamByCategory({
        categoryId: id,
        state: "ended",
      });
      setCategoryVideo(video.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch category error:", error);
    }
  };
  const fetchCategoryData = async () => {
    try {
      if (id) {
        const response = await getCategory(id);
        setCategory(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Fetch category data error:", error);
    }
  };
  useEffect(() => {
    fetchCategoryData();
    if (id) {
      fetchCategory();
    }
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 space-y-6">
      {categoryLive.length === 0 && categoryVideo.length === 0 ? (
        <div>
          <h1 className="text-2xl font-bold">Không tìm thấy kết quả</h1>
        </div>
      ) : (
        <>
          {categoryLive.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">
                Các kênh trực tiếp thuộc thể loại {category?.name}
              </h2>
              {categoryLive.slice(0, 5).map((stream) => (
                <SearchPreviousVideo key={stream.id} data={stream} />
              ))}
            </section>
          )}
          {categoryVideo.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">
                Video trước đây thuộc thể loại {category?.name}
              </h2>
              {categoryVideo.slice(0, 5).map((stream) => (
                <SearchPreviousVideo key={stream.id} data={stream} />
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
};
