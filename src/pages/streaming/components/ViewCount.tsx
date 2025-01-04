import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useSocketStore } from "@/stores/useSocket.ts";

interface ViewCountProps {
  streamId: string;
}

export function ViewCount({ streamId }: ViewCountProps) {
  const { socket } = useSocketStore();
  const [view, setView] = useState(0);

  useEffect(() => {
    const fetchViewCount = () => {
      if (socket) {
        socket.emit("stream:getView", streamId, (data: { data: number }) => {
          console.log("stream:getView:", data);
          setView(data.data);
        });
      }
    };

    fetchViewCount(); // Fetch initially
    const interval = setInterval(fetchViewCount, 10000); // Fetch every 30 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [socket, streamId]);

  return (
    <div className="flex items-center gap-1 text-sm">
      <Users className="w-4 h-4" />
      <span>{view} người đang xem</span>
    </div>
  );
}
