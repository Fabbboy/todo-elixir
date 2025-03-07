"use client";
import type { Todo } from "@/lib/task";
import type React from "react";

import axios from "axios";
import { useEffect, useState } from "react";
import TodoItem from "@/components/Task/Task";
import AddModal from "@/components/Task/AddModal";

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
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    }
  };

  const addTodo = async (title: string) => {
    try {
      const response = await axios.post<Todo>("/todos", {
        title,
        completed: false,
      });
      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get<Todo[]>("/todos");
        setTodos(response.data);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-start bg-background">
      <header className="p-4 flex flex-row items-start justify-between bg-card">
        <h1 className="text-2xl font-bold text-foreground">Todos</h1>
        <p className="text-md font-normal text-foreground">
          Housing {todos.length} todos
        </p>
      </header>
      <main className="flex-grow p-6">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
          ))
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            No todos yet. Create one to get started!
          </div>
        )}
      </main>
      <AddModal addTodo={addTodo} />
    </div>
  );
}
