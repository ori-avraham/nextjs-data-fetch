"use client";

import { FormState } from "@/app/tasks-management/page";
import { useActionState } from "react";

interface TaskFormProps {
  createTask: (prevState: FormState, formData: FormData) => Promise<FormState>;
}

export function TaskForm({ createTask }: TaskFormProps) {
  const [state, action, isPending] = useActionState(createTask, {});

  return (
    <div>
      <form action={action} className="space-y-4">
        <div>
          <input
            type="text"
            name="title"
            placeholder="Enter task title (min 3 characters)"
            className="w-full p-3 border-2 border-gray-200 focus:border-black outline-none"
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white p-3 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isPending ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Creating Task...
            </>
          ) : (
            "Create Task"
          )}
        </button>
      </form>

      {/* Status Messages */}
      {state.success && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
          <p className="text-green-800 text-sm">✅ {state.message}</p>
        </div>
      )}

      {state.error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-red-800 text-sm">❌ {state.error}</p>
        </div>
      )}
    </div>
  );
}
