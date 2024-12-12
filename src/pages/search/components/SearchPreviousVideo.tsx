import { Video } from "lucide-react";

export default function SearchPreviousVideo() {
  return (
    <div className="flex items-start gap-4 p-4 bg-background rounded-lg hover:bg-accent/50 transition-colors cursor-pointer max-w-2xl">
      {/* Thumbnail Section */}
      <div className="relative flex-shrink-0">
        <img
          src="https://placehold.co/600x400"
          alt="Stream thumbnail"
          className="rounded-md w-[200px] h-[120px] object-cover"
        />
        <div className="absolute flex gap-2 top-2 left-2 bg-gray-600 text-white text-xs font-medium px-2 py-0.5 rounded">
          <Video size={16} />
          11:13:12
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 min-w-0">
        <h1 className={"font-bold line-clamp-2"}>LCK Challenger Bot lane</h1>
        <div className="flex flex-col gap-1 mt-1">
          <p className="text-sm text-muted-foreground">Cao Hoàng</p>
          <p className="text-sm text-muted-foreground">League of legends</p>
          <div className={"flex text-sm text-muted-foreground mb-2 space-x-2"}>
            <p className="">4,1N lượt xem</p>
            <p className="">•</p>
            <p className="text-sm text-muted-foreground mb-2">3 ngày trước</p>
          </div>
        </div>
      </div>
    </div>
  );
}
