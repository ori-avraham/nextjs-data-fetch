"use client";
import { useEffect, useState } from "react";
import type { Task } from "@/types";

export default function useTasksSocket(initialTasks: Task[]) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");

    ws.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);
      if (type === "task") {
        setTasks((prev) => [payload, ...prev]);
      }
    };

    return () => ws.close();
  }, []);

  return tasks;
}
