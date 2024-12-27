import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import CommentTag from "@/pages/streaming/components/CommentTag.tsx";
import { useSocketStore } from "@/stores/useSocket.ts";
import InfiniteScroll from "react-infinite-scroll-component";
import { Paging } from "@/types/paging.ts";

interface MessageResponse {
  createdAt: string;
  message: string;
  messageId: string;
  streamId: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

interface ChatSidebarProps {
  streamId: string;
}

function convertToTime(isoString: string) {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function ChatSidebar({ streamId }: ChatSidebarProps) {
  const { socket } = useSocketStore();
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [paging, setPaging] = useState<Paging>({
    limit: 100,
    page: 0,
    total: 0,
  });
  const [newMessage, setNewMessage] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchChatData = () => {
    if (socket) {
      console.log({
        filter: {
          streamId: streamId,
        },
        paging: paging,
      });
      socket.emit(
        "chat:list",
        {
          filter: {
            streamId: streamId,
          },
          paging: paging,
        },
        (data: { data: MessageResponse[]; paging: Paging }) => {
          console.log(data);
          const reverseList = [...data.data].reverse();
          setMessages(reverseList);
          setPaging(data.paging);
        },
      );
    }
  };

  useEffect(() => {
    console.log("messages before: ", messages);
    fetchChatData();
    console.log("messages AFTER: ", messages);
  }, []);

  const handleSend = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      if (socket) {
        socket.emit("chat:create", newMessage, (data: unknown) => {
          console.log("Sent message:", data);
        });
      }

      setMessages([
        ...messages,
        {
          createdAt: currentTime,
          messageId: "nhdieuu",
          message: newMessage.trim(),
          streamId,
          updatedAt: currentTime,
          user: {
            id: "1",
            firstName: "User",
            lastName: "Name",
          },
        },
      ]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const fetchMoreData = () => {
    if (socket) {
      socket.emit("chat:list", {
        filter: {
          streamId: streamId,
        },
        paging: paging,
      });

      socket.on(
        "listChat",
        (data: { data: MessageResponse[]; paging: Paging }) => {
          if (data.paging.nextCursor === undefined) {
            setHasMore(false);
          } else {
            setPaging((prevPaging) => ({
              ...prevPaging,
              cursor: data.paging.nextCursor,
            }));
            console.log("next cursor: ", data.paging.nextCursor);
          }
          const reversedMessages = [...data.data].reverse();
          setMessages((prevMessages) => [...reversedMessages, ...prevMessages]);
        },
      );
    }
  };

  return (
    <div className="w-80 bg-white p-4 flex flex-col ">
      <div className={"flex flex-col-reverse"}>
        <InfiniteScroll
          style={{ display: "flex", flexDirection: "column-reverse" }}
          dataLength={messages.length}
          height={700}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p style={{ textAlign: "center" }}>No more messages</p>}
          className="flex-1 overflow-y-scroll max-h-[700px] "
        >
          <div className="space-y-4 mb-4">
            <div className="space-y-2">
              {messages.map((message, index) => (
                <CommentTag
                  key={index}
                  date={convertToTime(message.createdAt)}
                  username={`${message.user.firstName} ${message.user.lastName}`}
                  content={message.message}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </InfiniteScroll>
      </div>

      <div className="flex  items-center gap-2">
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="resize-none"
          rows={1}
        />
        <Button onClick={handleSend} size="icon" className="shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
