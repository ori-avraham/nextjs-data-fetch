import { TaskForm } from "@/components/task-form";
import { TaskList } from "@/components/task-list";
import { Task } from "@/types";
import { revalidateTag } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";

export interface FormState {
  success?: boolean;
  error?: string;
  message?: string;
  data?: Task;
}

async function getTasks(): Promise<Task[]> {
  const res = await fetch(
    "http://localhost:5000/tasks?_limit=8&_sort=id&_order=desc",
    {
      next: { tags: ["tasks"] },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch tasks");

  return res.json();
}

async function createTask(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  "use server";

  const title = formData.get("title") as string;

  // Validation
  if (!title || title.trim().length < 3) {
    return {
      success: false,
      error: "Title must be at least 3 characters long",
    };
  }

  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.trim(),
        completed: false,
        userId: 1,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create task");
    }

    const newTask = await response.json();

    // Revalidate the tasks cache
    revalidateTag("tasks");

    return {
      success: true,
      message: `Task "${title}" created successfully!`,
      data: newTask,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to create task. Please try again.",
    };
  }
}

async function toggleTask(formData: FormData): Promise<void> {
  "use server";

  const taskId = formData.get("taskId") as string;
  const completed = formData.get("completed") === "true";

  try {
    await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Delay": "10000",
      },
      body: JSON.stringify({
        completed: !completed,
      }),
    });
  } catch (error) {
    console.error("Failed to toggle task:", error);
  } finally {
    revalidateTag("tasks");
  }
}

async function deleteTask(formData: FormData): Promise<void> {
  "use server";

  const taskId = formData.get("taskId") as string;

  try {
    await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "DELETE",
    });

    revalidateTag("tasks");
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
}

export default async function TasksManagementPage() {
  const tasks = await getTasks();

  return (
    <>
      <div className="mb-8">
        <Link href="/" className="text-black hover:underline">
          ← Back to Home
        </Link>
      </div>

      <header className="mb-12">
        <h1 className="text-3xl font-bold text-black mb-4">
          Server Actions Kitchen Sink
        </h1>
        <div className="bg-black text-white p-6 rounded">
          <h2 className="text-lg font-bold mb-2">
            Comprehensive Server Actions Demo
          </h2>
          <p className="text-sm mb-4">
            This page demonstrates all aspects of Server Actions: form
            validation, error handling, loading states, redirects, bulk
            operations, and real-time updates without API routes.
          </p>
          <div className="text-xs font-mono bg-gray-800 p-2 rounded">
            {
              'async function action() { "use server"; /* server-side logic */ }'
            }
          </div>
        </div>
      </header>

      <div className="space-y-6">
        <div className="border-2 border-black p-6">
          <h3 className="text-xl font-bold mb-4">Task Management</h3>
          <p className="text-sm text-gray-600 mb-6">
            Create, toggle, and delete tasks with validation and error handling
          </p>

          <TaskForm createTask={createTask} />

          <div className="mt-6">
            <Suspense
              fallback={
                <div className="animate-pulse bg-gray-200 h-32 rounded"></div>
              }
            >
              <TaskList
                tasks={tasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
