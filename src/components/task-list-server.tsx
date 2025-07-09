import { Task } from "@/types";

interface TaskListProps {
  tasks: Task[];
  toggleTask: (formData: FormData) => Promise<void>;
  deleteTask: (formData: FormData) => Promise<void>;
}

export function TaskListServer({ tasks, toggleTask, deleteTask }: TaskListProps) {
  return (
    <div>
      <h4 className="font-bold mb-3">Task List ({tasks.length})</h4>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-sm">No tasks yet. Create one above!</p>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 border rounded"
            >
              <div className="flex items-center space-x-3">
                <form action={toggleTask}>
                  <input type="hidden" name="taskId" value={task.id} />
                  <input
                    type="hidden"
                    name="completed"
                    value={task.completed.toString()}
                  />
                  <button
                    type="submit"
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      task.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-green-500"
                    }`}
                  >
                    {task.completed && "✓"}
                  </button>
                </form>
                <span
                  className={`text-sm ${
                    task.completed ? "line-through text-gray-500" : "text-black"
                  }`}
                >
                  {task.title}
                </span>
              </div>

              <form action={deleteTask}>
                <input type="hidden" name="taskId" value={task.id} />
                <button
                  type="submit"
                  className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
