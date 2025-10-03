"use client";
import React, { useState, useEffect } from "react";
import { todoApi, TodoItem } from "@/lib/api";

const Todos = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // データ取得
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await todoApi.getAllTodos();
      setTodos(response.data.items);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
      setError("Todoの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <div className="min-h-screen p-5">
        <div className="bg-gray-300/50 ">
          <ul>
            {todos.map((todo) => {
              return (
                <li
                  key={todo.id}
                  className="flex items-center gap-2 p-2 border-b"
                >
                  <input type="checkbox" className="size-5" />
                  <span className="flex-1 text-xl">{todo.title}</span>
                  <button className="px-2 py-1 bg-blue-500 text-white rounded">
                    詳細
                  </button>
                  <button className="px-2 py-1 bg-green-500 text-white rounded">
                    編集
                  </button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded">
                    削除
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todos;
