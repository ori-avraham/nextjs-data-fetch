// app/tasks/page.tsx (or your SSRPage component file)

import Link from "next/link";
import { revalidateTag } from "next/cache";

interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

// Fetch tasks server-side
async function getTasks() {
  const res = await fetch("http://localhost:5000/tasks", {
    cache: "no-store",
    next: { tags: ["tasks"] },
  });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json() as Promise<Task[]>;
}

// Server action to handle form submission
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

export default async function SSRPage() {
  const tasks = await getTasks();
  const currentTime = new Date().toLocaleString();

  return (
    <>
      <div className="mb-8">
        <Link href="/" className="text-black hover:underline">
          ← Back to Home
        </Link>
      </div>

      {/* Form uses server action */}
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

      {/* Rest of your page content */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Post Page</h1>
        <h2 className="text-xl font-medium mb-4">
          Server-Side Rendering (SSR)
        </h2>
        <div className="bg-black text-white p-6 rounded">
          <h2 className="text-lg font-bold mb-2">How it works:</h2>
          <p className="text-sm mb-4">
            Data is fetched on the server for each request. The page is rendered
            on the server and sent to the client as HTML. Perfect for dynamic,
            personalized content.
          </p>
          <div className="text-xs font-mono bg-gray-800 p-2 rounded">
            {'fetch(url, { cache: "no-store" })'}
          </div>
        </div>
      </header>

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
          These tasks are fetched fresh on every request, making this ideal for
          real-time task tracking, to-do dashboards, and productivity apps.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {tasks
          .sort((a, b) => b.id - a.id)
          .map((task) => (
            <div
              key={task.id}
              className="border-2 border-gray-200 p-6 hover:border-black transition-colors"
            >
              <h3 className="text-lg font-bold mb-2 capitalize">
                {task.title}
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`inline-block px-2 py-1 rounded text-white ${
                      task.completed ? "bg-gray-500" : "bg-black"
                    }`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </p>
                <p>
                  <strong>User ID:</strong> {task.userId}
                </p>
                <p>
                  <strong>Task ID:</strong> {task.id}
                </p>
              </div>
            </div>
          ))}
      </div>

      <div className="mt-12 p-6 bg-gray-50 border-l-4 border-black">
        <h3 className="font-bold mb-2">When to use SSR:</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Task dashboards and productivity tools</li>
          <li>• Real-time data that changes frequently</li>
          <li>• Personalized content</li>
          <li>• Pages that require authentication</li>
          <li>• Content that depends on request data (headers, cookies)</li>
        </ul>
      </div>
    </>
  );
}
