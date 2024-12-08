import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import React from "react";
import CommentTag from "@/pages/streaming/components/CommentTag.tsx";
import VideoPlayer from "@/components/VideoPlayer.tsx";

export default function StreamingPage() {
  return (
    <div className="min-h-screen">
      {/* Main content area */}
      <div className="flex ">
        {/* Stream and info section */}
        <div className="flex-1 flex flex-col">
          {/* Video player area */}
          <div className="w-full aspect-video">
            <VideoPlayer
              src={"http://34.124.179.64:3000/static/test/index-1080p60.m3u8"}
            ></VideoPlayer>
          </div>

          {/* Channel info section */}
          <div className="p-4 ">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                {/* Avatar and live indicator */}
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>CH</AvatarFallback>
                  </Avatar>
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-semibold bg-red-500 text-white rounded">
                    LIVE
                  </span>
                </div>

                {/* Stream info */}
                <div className="space-y-1">
                  <h1 className="text-xl font-semibold">Cao Hoàng</h1>
                  <p className="text-sm ">Stream name</p>
                  <p className="text-sm ">League of Legends</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      "English",
                      "leagueoflegends",
                      "Tournament",
                      "League",
                      "pro",
                      "programing",
                      "ProfessionalGamer",
                      "EuropeanCircuit",
                      "europeanleague",
                      "Circuit",
                    ].map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-gray-300 hover:bg-gray-200 "
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm">
                  <Users className="w-4 h-4" />
                  <span>34</span>
                </div>
                <span className="text-sm text-zinc-400">0:53:31</span>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Follow
                </Button>
              </div>
            </div>

            {/* About section */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">About Cao Hoàng</h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium">2.6K followers</span>
              </div>
              <p className="text-sm  mb-4">
                Cao Hoàng is a professional League of Legends player from
                Vietnam. He is currently playing for T1 in the LCK.
              </p>
            </div>
          </div>
        </div>

        {/* Chat sidebar */}
        <div className="w-80 bg-white p-4">
          <div className="space-y-4">
            {/* Chat messages */}
            <div className="space-y-2">
              <CommentTag
                date={"19:36"}
                username={"nhdieuu"}
                content={"Let's go void walker win my 500$"}
              ></CommentTag>
              <CommentTag
                date={"19:36"}
                username={"nhdieuu"}
                content={"Ez baron"}
              ></CommentTag>
              <CommentTag
                date={"19:36"}
                username={"nhdieuu"}
                content={"Thanks void walkers"}
              ></CommentTag>
            </div>

            {/* Vietnamese text */}
            <div className="text-sm text-zinc-300">
              Chào mừng bạn đến với phòng trò chuyện!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}