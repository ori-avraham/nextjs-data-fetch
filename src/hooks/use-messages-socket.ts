"use client";
import { useEffect, useState } from "react";
import type { Message } from "@/types";

export default function useMessagesSocket(initialMessages: Message[]) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");

    ws.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);
      if (type === "message") {
        setMessages((prev) => [payload, ...prev]);
      }
    };

    return () => ws.close();
  }, []);

  return messages;
}
