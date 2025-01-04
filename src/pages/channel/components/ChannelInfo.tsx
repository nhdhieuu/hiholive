import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Channel } from "@/types/channel.ts";

interface ChannelInfoProps {
  channel?: Channel;
}

export default function ChannelInfo({ channel }: ChannelInfoProps) {
  return (
    <div className="mt-4 pb-4 border-b border-gray-800">
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={
              channel?.image?.url ||
              "https://placehold.co/600x400?text=Hiholive"
            }
          />
          <AvatarFallback>ST</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{channel?.displayName}</h1>
          </div>
          <p className="mt-4 text-gray-300">
            {channel?.description || "Kênh này chưa cập nhật mô tả."}
          </p>
          <p className="mt-4 text-gray-300">
            Liên hệ:{" "}
            {channel?.contact || "Kênh này chưa cập nhật thông tin liên hệ."}
          </p>
        </div>
      </div>
    </div>
  );
}
