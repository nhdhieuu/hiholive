import { Category } from "@/types/category.ts";

interface SearchCategoryCardProps {
  data: Category;
}

export function SearchCategoryCard({ data }: SearchCategoryCardProps) {
  return (
    <div className="flex items-start gap-4 p-4 bg-background rounded-lg hover:bg-accent/50 transition-colors cursor-pointer max-w-2xl">
      {/* Thumbnail Section */}
      <div className="relative flex-shrink-0">
        <img
          src={data.image.url}
          alt={`${data.name} thumbnail`}
          className="rounded-md w-[200px] h-[120px] object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <div>
            <h3 className="font-medium text-base line-clamp-1">{data.name}</h3>
            <p className="text-sm text-muted-foreground">
              {data.totalContent} nội dung
            </p>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
}
