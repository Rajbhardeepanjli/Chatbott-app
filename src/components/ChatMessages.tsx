"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
//function for chat- message
export default function ChatMessages({ messages }: { messages: Message[] }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={cn(
            "flex",
            msg.role === "user" ? "justify-end" : "justify-start"
          )}
        >
          <Card
            className={cn(
              "px-3 py-2 rounded-2xl shadow-sm max-w-[75%] relative",
              msg.role === "user"
                ? "bg-blue-500 text-white rounded-br-none"
                : "bg-gray-100 text-gray-900 rounded-bl-none"
            )}
          >
          
            <p className="text-sm pr-10">{msg.content}</p>

           
            <span
              className={cn(
                "absolute bottom-1 text-[10px]",
                msg.role === "user"
                  ? "right-2 text-blue-100"
                  : "right-2 text-gray-500"
              )}
            >
              {formatTime(msg.timestamp)}
            </span>
          </Card>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
