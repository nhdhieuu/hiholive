import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CategoryCardProps {
  title: string;
  viewers: number;
  tags: string[];
  imageUrl: string;
}
export default function CategoryCard({
  title,
  viewers,
  tags,
  imageUrl,
}: CategoryCardProps) {
  return (
    <Card className="w-[250px] overflow-hidden hover:bg-gray-50 ">
      <div className="relative">
        <img
          src={imageUrl}
          alt="League of Legends character"
          className="w-full object-cover"
        />
        <div className="absolute inset-0" />
      </div>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold line-clamp-1">{title}</h2>
          <p className="text-gray-400">{viewers} viewers</p>
        </div>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-gray-800 text-gray-200 hover:bg-gray-700"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
