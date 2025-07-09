"use client";

import { Task } from "@/types";
import { useOptimistic, useState, useTransition } from "react";

interface TaskListProps {
  tasks: Task[];
  toggleTask: (formData: FormData) => Promise<void>;
  deleteTask: (formData: FormData) => Promise<void>;
}

export function TaskList({ tasks, toggleTask, deleteTask }: TaskListProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticTasks, updateOptimisticTasks] = useOptimistic(
    tasks,
    (state, { action, id }: { action: "toggle" | "delete"; id: number }) => {
      if (action === "toggle") {
        return state.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        );
      } else if (action === "delete") {
        return state.filter((task) => task.id !== id);
      }
      return state;
    }
  );

  const handleToggle = (task: Task) => {
    // Optimistic update
    startTransition(() => {
      updateOptimisticTasks({ action: "toggle", id: task.id });
    });

    const formData = new FormData();
    formData.append("taskId", task.id.toString());
    formData.append("completed", task.completed.toString());
    toggleTask(formData);
  };

  const handleDelete = (taskId: number) => {
    startTransition(() => {
      updateOptimisticTasks({ action: "delete", id: taskId });
    });

    const formData = new FormData();
    formData.append("taskId", taskId.toString());
    deleteTask(formData);
  };

  return (
    <div>
      <h4 className="font-bold mb-3">Task List ({optimisticTasks.length})</h4>

      {optimisticTasks.length === 0 ? (
        <p className="text-gray-500 text-sm">No tasks yet. Create one above!</p>
      ) : (
        <div className="space-y-2">
          {optimisticTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-3 border rounded transition-opacity ${
                isPending ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <button
                  role="checkbox"
                  aria-checked={task.completed}
                  onClick={() => handleToggle(task)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    task.completed
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                >
                  {task.completed && "✓"}
                </button>
                <span
                  className={`text-sm ${
                    task.completed ? "line-through text-gray-500" : "text-black"
                  }`}
                >
                  {task.title}
                </span>
              </div>

              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
