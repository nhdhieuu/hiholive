import { Channel } from "@/types/channel.ts";
import { useNavigate } from "react-router-dom";

interface SearchChannelProps {
  channel: Channel;
}

export default function SearchChannel({ channel }: SearchChannelProps) {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center gap-4 p-4 max-w-xl hover:bg-accent/50 transition-colors cursor-pointer"
      onClick={() => {
        navigate(`/channel/${channel.userName}`);
      }}
    >
      <img
        src={channel?.image?.url || "https://placehold.co/600x400"}
        alt="Channel avatar"
        className="w-20 h-20 rounded-full object-cover"
      />
      <div>
        <h2 className="text-xl font-semibold mb-1">{channel.displayName}</h2>
        <p className="text-muted-foreground">{channel.description}</p>
        <p className="text-muted-foreground">{channel.contact}</p>
      </div>
    </div>
  );
}
