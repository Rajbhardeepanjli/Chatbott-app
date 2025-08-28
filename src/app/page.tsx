"use client";

import { useState } from "react";
import ChatMessages from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text: string) => {
    const newMsg: Message = {
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: text }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "⚠️ No response from bot.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Error contacting the server.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* Centered Container */}
      <div className="flex flex-col w-full max-w-2xl h-[90vh] bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex justify-between items-center shadow">
          <h1 className="font-semibold">💬 Chat Assistant</h1>
          <button
            onClick={() => setMessages([])}
            className="bg-white text-blue-600 px-3 py-1 rounded-2xl shadow text-sm"
          >
            New Chat
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 py-2">
          <ChatMessages messages={messages} />
          {loading && (
            <div className="text-gray-500 text-sm p-2 text-center">
              Thinking…
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-2 border-t">
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}
