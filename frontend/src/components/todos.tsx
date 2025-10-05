"use client";
import React, { useState, useEffect } from "react";
import { todoApi } from "@/lib/api";
import { TodoItem } from "@/types";
import DetailModal from "./Modals/DetailModal";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";

const Todos = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // データ取得
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await todoApi.getAllTodos();
      setTodos(response.data.items);
      setError("");
    } catch (err) {
      console.error("Failed to fetch todos:", err);
      setError("Todoの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  // 完了状態の切り替え
  const handleToggle = async (id: number) => {
    try {
      const response = await todoApi.toggleTodoStatus(id);
      setTodos(
        todos.map((todo) => (todo.id === id ? response.data.item : todo))
      );
    } catch (error) {
      console.error("Failed to toggle status:", error);
    }
  };

  const handleOpenDetail = (todo: TodoItem) => {
    setSelectedTodo(todo);
    setIsDetailModalOpen(true);
    console.log(isDetailModalOpen);
  };

  const closeModals = () => {
    setIsDetailModalOpen(false);
    setSelectedTodo(null);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  // エラー時の表示
  if (error) {
    return <ErrorMessage error={error} />;
  }

  // ローディング状態の表示
  if (loading) {
    return <LoadingMessage message="Todoの取得中です" />;
  }
  return (
    <div>
      <div className="min-h-screen p-5">
        {!todos ? (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-xl">Todoがありません</p>
          </div>
        ) : (
          <div className="bg-gray-300/50 ">
            <ul>
              {todos.map((todo) => {
                return (
                  <li
                    key={todo.id}
                    className="flex items-center gap-2 p-2 border-b"
                  >
                    <input
                      type="checkbox"
                      className="size-5 cursor-pointer"
                      checked={Boolean(todo.completed)}
                      onChange={() => handleToggle(todo.id)}
                    />
                    <span className="flex-1 text-xl">{todo.title}</span>
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer"
                      onClick={() => handleOpenDetail(todo)}
                    >
                      詳細
                    </button>
                    <button className="px-2 py-1 bg-green-500 text-white rounded cursor-pointer">
                      編集
                    </button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer">
                      削除
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <DetailModal isOpen={isDetailModalOpen} onClose={closeModals} />
      </div>
    </div>
  );
};

export default Todos;
