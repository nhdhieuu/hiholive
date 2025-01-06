import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import CommentTag from "@/pages/streaming/components/CommentTag.tsx";
import { useSocketStore } from "@/stores/useSocket.ts";
import InfiniteScroll from "react-infinite-scroll-component";
import { Paging } from "@/types/paging.ts";
import { toast } from "react-toastify";
import { useUserProfile } from "@/stores/useUserProfile.ts";

interface MessageResponse {
  createdAt: string;
  message: string;
  messageId: string;
  streamId: string;
  updatedAt: string;
  user: {
    id: string;
    firstName?: string;
    lastName?: string;
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
  const { userProfile } = useUserProfile();
  const token = localStorage.getItem("token");
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [paging, setPaging] = useState<Paging>({
    limit: 100,
    page: 0,
    total: 0,
  });
  const [newMessage, setNewMessage] = useState("");
  /*const [hasMore, setHasMore] = useState(true);*/
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchChatData = () => {
    if (socket) {
      socket.emit(
        "chat:list",
        {
          filter: {
            streamId: streamId,
          },
          paging: paging,
        },
        (data: { data: MessageResponse[]; paging: Paging }) => {
          console.log("Chat data:", data);
          const reverseList = [...data.data].reverse();
          setMessages(reverseList);
          setPaging(data.paging);
        },
      );
    }
  };

  useEffect(() => {
    fetchChatData();
    if (socket) {
      socket.on("newMessage", (data: MessageResponse) => {
        console.log("newMessage", data);
        setMessages((prevMessages) => [...prevMessages, data]);
      });
    }
    return () => {
      if (socket) {
        socket.emit("stream:leave", streamId, (data: unknown) => {
          console.log("Leave stream:", data);
        });
      }
    };
  }, [socket, streamId]);

  const handleSend = () => {
    if (token) {
      if (newMessage.trim()) {
        const currentTime = new Date().toISOString();

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
              firstName: userProfile?.first_name,
              lastName: userProfile?.last_name,
            },
          },
        ]);
        setNewMessage("");
      }
    } else {
      toast.error("Vui lòng đăng nhập!", {
        position: "top-right",
        autoClose: 3000, // Tự động đóng sau 3 giây
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /*const fetchMoreData = () => {
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
  };*/

  return (
    <div className="w-80 bg-white p-4 flex flex-col ">
      <div className={"flex flex-col-reverse"}>
        <InfiniteScroll
          style={{
            display: "flex",
            flexDirection: "column-reverse",
          }}
          dataLength={messages.length}
          height={700}
          next={() => {}}
          hasMore={false}
          loader={<h4>Loading...</h4>}
          endMessage={<div></div>}
          className="flex-1 overflow-y-scroll max-h-[700px] "
        >
          <div className="space-y-4 mb-4">
            <div className="space-y-2">
              {messages.length === 0 ? (
                <p style={{ textAlign: "center", alignContent: "center" }}>
                  Chưa có tin nhắn
                </p>
              ) : (
                messages.map((message, index) => (
                  <CommentTag
                    key={index}
                    date={convertToTime(message.createdAt)}
                    username={`${message.user.firstName} ${message.user.lastName}`}
                    content={message.message}
                  />
                ))
              )}
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
          placeholder="Nhập tin nhắn..."
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
