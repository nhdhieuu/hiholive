"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import CommentTag from "@/pages/streaming/components/CommentTag.tsx";
import { useSocketStore } from "@/stores/useSocket.ts";

interface Paging {
  limit: string;
  nextCursor: {
    messageId: string;
    streamId: string;
  };
}

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
  const [newMessage, setNewMessage] = useState("");
  const [page, setPage] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.emit("listChat", {
        filter: {
          streamId: streamId,
        },
        paging: {
          limit: 15,
          page: page,
        },
      });

      socket.on("listChat", (data) => {
        console.log("response: ", data);
        console.log("List chat:", data.data);
        const reversedMessages = [...data.data].reverse();
        setMessages((prevMessages) => [...reversedMessages, ...prevMessages]);
      });
    }
  }, [socket, streamId, page]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      if (socket) {
        socket.emit("sendMessage", {
          streamId,
          message: newMessage,
        });
        socket.on("sendMessage", (data) => {
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

  /*const handleScroll = () => {
    if (messagesContainerRef.current) {
      if (messagesContainerRef.current.scrollTop === 0) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };*/

  return (
    <div className="w-80 bg-white p-4 flex flex-col ">
      <div
        className="flex-1 overflow-y-scroll max-h-[700px]"
        ref={messagesContainerRef}
        /*
        onScroll={handleScroll}
*/
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
