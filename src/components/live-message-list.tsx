"use client";
import useMessagesSocket from "@/hooks/use-messages-socket";
import type { Message } from "@/types";

export default function LiveMessageList({
  initialMessages,
}: {
  initialMessages: Message[];
}) {
  const messages = useMessagesSocket(initialMessages);

  return (
    <div className="space-y-6">
      {messages
        .sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
        .map((msg) => (
          <div
            key={msg.id}
            className="border-2 border-gray-200 p-6 hover:border-black transition-colors"
          >
            <p className="text-lg mb-2">{msg.content}</p>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <strong>User ID:</strong> {msg.userId}
              </p>
              <p>
                <strong>Message ID:</strong> {msg.id}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
