"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ChatInput({
  onSend,
}: {
  onSend: (message: string) => void;
}) {
  const [input, setInput] = useState("");
//handle send function
  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };
//from key you can send 
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); 
      handleSend();
    }
  };
//this is textarea code
  return (
    <div className="flex items-center gap-2 border-t p-3 bg-white">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="resize-none flex-1 min-h-[45px] max-h-[150px] rounded-xl"
      />
      <Button
        onClick={handleSend}
        className="rounded-xl px-4 py-2"
      >
        Send
      </Button>
    </div>
  );
}
