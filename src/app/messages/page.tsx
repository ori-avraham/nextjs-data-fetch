import { revalidateTag } from "next/cache";
import type { Message } from "@/types";
import Link from "next/link";
import LiveMessageList from "@/components/live-message-list";

/* ---- data helpers ---- */
async function getMessages(): Promise<Message[]> {
  const res = await fetch("http://localhost:5000/messages", {
    cache: "no-store",
    next: { tags: ["messages"] },
  });
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

async function addMessage(formData: FormData) {
  "use server";

  const content = formData.get("content");
  const userId = formData.get("userId");

  if (typeof content !== "string" || typeof userId !== "string") {
    throw new Error("Invalid form data");
  }

  await fetch("http://localhost:5000/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content,
      userId: parseInt(userId, 10),
      createdAt: new Date().toISOString(),
    }),
  });

  revalidateTag("messages");
}

/* ---- page component ---- */
export default async function MessagesPage() {
  const messages = await getMessages();
  const currentTime = new Date().toLocaleString();

  return (
    <>
      <div className="mb-8">
        <Link href="/" className="text-black hover:underline">
          ← Back to Home
        </Link>
      </div>

      {/* new-message form */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4">Add a New Message</h2>
        <form
          action={addMessage}
          className="space-y-4 border border-gray-200 p-4 rounded"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              name="content"
              rows={3}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              User&nbsp;ID
            </label>
            <input
              name="userId"
              type="number"
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Add Message
          </button>
        </form>
      </div>

      {/* render timestamp */}
      <div className="mb-8 p-4 bg-gray-100 border-l-4 border-black">
        <p className="text-sm">
          <strong>Page rendered at:</strong> {currentTime}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          This timestamp updates on every refresh, proving the page is rendered
          server-side on each request.
        </p>
      </div>

      {/* live list */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Message Dashboard (Live)</h2>
        <p className="text-gray-600 text-sm mb-6">
          Messages are fetched on every request and update in real time when new
          ones arrive over WebSocket.
        </p>
      </div>

      <LiveMessageList initialMessages={messages} />
    </>
  );
}
