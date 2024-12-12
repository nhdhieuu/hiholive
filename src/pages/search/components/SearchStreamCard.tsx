import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import React from "react";

export default function SearchStreamCard() {
  return (
    <div className="flex items-start gap-4 p-4 bg-background rounded-lg hover:bg-accent/50 transition-colors cursor-pointer max-w-2xl">
      {/* Thumbnail Section */}
      <div className="relative flex-shrink-0">
        <img
          src="https://placehold.co/600x400"
          alt="Stream thumbnail"
          className="rounded-md w-[200px] h-[120px] object-cover"
        />
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-medium px-2 py-0.5 rounded">
          TRỰC TIẾP
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Avatar>
            <AvatarImage
              src="https://placehold.co/600x400"
              alt="Stream thumbnail"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-base">Cao Hoàng</h3>
            <p className="text-sm text-muted-foreground">League of legends</p>
          </div>
        </div>

        <div className="mt-1">
          <p className="text-sm text-muted-foreground mb-2">7 người xem</p>
          <p className="text-sm text-muted-foreground mb-2">
            cozy Stream✨ | !bubbles !supervive
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
              123
            </span>
            <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
              Weiblich
            </span>
            <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
              Cats
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}