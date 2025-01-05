import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types/category.ts";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const navigate = useNavigate();
  return (
    <Card
      className="w-[250px] overflow-hidden hover:bg-gray-50"
      onClick={() => navigate(`/category/${category.id}`)}
    >
      <div className="relative aspect-[16/9] h-[140px]">
        <img
          src={category.image.url}
          alt="League of Legends character"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" />
      </div>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold line-clamp-1">{category.name}</h2>
          <p className="text-gray-400">{category.description}</p>
          <p className="text-gray-400">{category.totalContent} nội dung</p>
        </div>
      </CardContent>
    </Card>
  );
}
