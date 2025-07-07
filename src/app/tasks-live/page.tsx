import { revalidateTag } from "next/cache";
import type { Task } from "@/types";
import Link from "next/link";
import LiveTaskList from "@/components/live-task-list";

async function getTasks(): Promise<Task[]> {
  const res = await fetch("http://localhost:5000/tasks", {
    cache: "no-store",
    next: { tags: ["tasks"] },
  });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

async function addTask(formData: FormData) {
  "use server";

  const title = formData.get("title");
  const userId = formData.get("userId");

  if (typeof title !== "string" || typeof userId !== "string") {
    throw new Error("Invalid form data");
  }

  await fetch("http://localhost:5000/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, userId: parseInt(userId), completed: false }),
  });

  revalidateTag("tasks");
}

export default async function TasksPage() {
  const tasks = await getTasks();
  const currentTime = new Date().toLocaleString();

  return (
    <>
      <div className="mb-8">
        <Link href="/" className="text-black hover:underline">
          ← Back to Home
        </Link>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4">Add a New Task</h2>
        <form
          action={addTask}
          className="space-y-4 border border-gray-200 p-4 rounded"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              name="title"
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">User ID</label>
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
            Add Task
          </button>
        </form>
      </div>

      <div className="mb-8 p-4 bg-gray-100 border-l-4 border-black">
        <p className="text-sm">
          <strong>Page rendered at:</strong> {currentTime}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          This timestamp updates on every page refresh, proving the page is
          rendered server-side on each request.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          Task Dashboard (Rendered on Each Request)
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          These tasks are fetched fresh on every request, and updated in
          real-time when new tasks are added.
        </p>
      </div>

      <LiveTaskList initialTasks={tasks} />
    </>
  );
}
