import { Channel } from "@/types/channel.ts";

interface SearchChannelProps {
  channel: Channel;
}

export default function SearchChannel({ channel }: SearchChannelProps) {
  return (
    <div className="flex items-center gap-4 p-4 max-w-xl">
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
