"use client";
import useTasksSocket from "@/hooks/use-tasks-socket";
import type { Task } from "@/types";

export default function LiveTaskList({
  initialTasks,
}: {
  initialTasks: Task[];
}) {
  const tasks = useTasksSocket(initialTasks);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {tasks
        .sort((a, b) => b.id - a.id)
        .map((task) => (
          <div
            key={task.id}
            className="border-2 border-gray-200 p-6 hover:border-black transition-colors"
          >
            <h3 className="text-lg font-bold mb-2 capitalize">{task.title}</h3>
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
  );
}
