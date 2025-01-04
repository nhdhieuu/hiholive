import { useParams } from "react-router-dom";
import { getListStreamByCategory } from "@/pages/category/api/categoryApi.ts";
import { useEffect, useState } from "react";
import { Stream } from "@/types/stream.ts";

export const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [categoryLive, setCategoryLive] = useState<Stream[]>([]);
  const fetchCategory = async () => {
    try {
      const response = await getListStreamByCategory({
        categoryId: id,
        state: "running",
      });
      console.log("Response", response);
      setCategoryLive(response.data);
      console.log("Category live:", categoryLive);
    } catch (error) {
      console.error("Fetch category error:", error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchCategory();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 space-y-6">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          Các kênh trực tiếp thuộc thể loại {id}
        </h2>
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Video trước đây</h2>
      </section>
    </div>
  );
};
