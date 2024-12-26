import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

export default function ChannelInfo() {
  return (
    <div className="mt-4 pb-4 border-b border-gray-800">
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>ST</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Streamer</h1>
            <Badge variant="secondary">Live</Badge>
          </div>
          <h2 className="text-xl">League of Legends</h2>
          <p className="text-gray-400 mt-2">548K followers</p>
          <p className="mt-4 text-gray-300">
            Playing ranked games with viewers! !discord !socials !schedule Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore.
          </p>
        </div>

        <div className="flex gap-2">
          <Button>
            <Heart className="h-4 w-4 mr-2" />
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
}
