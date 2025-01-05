import { Stream } from "@/types/stream.ts";
import { useNavigate } from "react-router-dom";

interface SearchPreviousVideoProps {
  data: Stream;
}

export default function SearchPreviousVideo({
  data,
}: SearchPreviousVideoProps) {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-start gap-4 p-4 bg-background rounded-lg hover:bg-accent/50 transition-colors cursor-pointer max-w-2xl"
      onClick={() => {
        navigate(`/video/${data.id}`);
      }}
    >
      {/* Thumbnail Section */}
      <div className="relative flex-shrink-0">
        <img
          src="https://placehold.co/600x400?text=Hiholive"
          alt="Stream thumbnail"
          className="rounded-md w-[200px] h-[120px] object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 min-w-0">
        <h1 className={"font-bold line-clamp-2"}>{data.title}</h1>
        <div className="flex flex-col gap-1 mt-1">
          <p className="text-sm text-muted-foreground">
            {data.channel.displayName}
          </p>
          <p className="text-sm text-muted-foreground">
            {data.category?.name || "Unknown Category"}
          </p>
          <p className="text-sm text-muted-foreground">{data.description}</p>
        </div>
      </div>
    </div>
  );
}
