"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import CommentTag from "@/pages/streaming/components/CommentTag.tsx";

interface Message {
  date: string;
  username: string;
  content: string;
}

export function ChatSidebar() {
  const [messages, setMessages] = useState<Message[]>([
    {
      date: "19:36",
      username: "nhdieuu",
      content: "Let's go void walker win my 500$",
    },
    {
      date: "19:36",
      username: "nhdieuu",
      content: "Ez baron",
    },
    {
      date: "19:36",
      username: "nhdieuu",
      content: "Thanks void walkers",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });

      setMessages([
        ...messages,
        {
          date: currentTime,
          username: "nhdieuu", // This would normally come from auth context
          content: newMessage.trim(),
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

  return (
    <div className="w-80 bg-white p-4 flex flex-col ">
      {/* Messages container */}
      <div className={"flex-1 overflow-y-scroll max-h-[700px]"}>
        <div className="space-y-4 mb-4">
          <div className="space-y-2">
            {messages.map((message, index) => (
              <CommentTag
                key={index}
                date={message.date}
                username={message.username}
                content={message.content}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Chat input */}
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
