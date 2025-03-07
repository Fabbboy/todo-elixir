"use client";
import { Todo } from "@/lib/task";
import axios from "axios";
import { useEffect, useState } from "react";
import TodoItem from "@/components/Task/Task";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const toggleTodo = async (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    try {
      await axios.patch(`/todos/${id}`, {
        completed: !todos.find((todo) => todo.id === id)?.completed,
      });
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get<Todo[]>("/todos");

      setTodos(response.data);
    };

    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-start">
      <header className="bg-neutral-800 text-neutral-100 p-4 flex flex-row items-start justify-between">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <p className="text-md font-normal">Housing {todos.length} todos</p>
      </header>
      <main className="flex-grow p-6">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        ))}
      </main>
    </div>
  );
}
