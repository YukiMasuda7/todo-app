"use client";
import React, { useState, useEffect } from "react";
import { todoApi } from "@/lib/api";
import { TodoItem } from "@/types";
import DetailModal from "./Modals/DetailModal";
import EditModal from "./Modals/EditModal";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";

const Todos = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState<string>("");

  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 全てのtodoを取得
  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      setLoadingMessage("todoの取得中です");
      const response = await todoApi.getAllTodos();
      setTodos(response.data.items);
      setError("");
    } catch (err) {
      console.error("Failed to fetch todos:", err);
      setError("Todoの取得に失敗しました");
    } finally {
      setIsLoading(false);
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

  // todoの編集
  const handleUpdateTodo = async (
    id: number,
    updateData: {
      title: string;
      content: string;
    }
  ) => {
    try {
      setIsLoading(true);
      setLoadingMessage("編集中です");
      const response = await todoApi.updateTodo(id, updateData);
      setTodos(
        todos.map((todo) => (todo.id === id ? response.data.item : todo))
      );
      setIsEditModalOpen(false);
      setError("");
    } catch (err) {
      console.error("Failed to update todo:", err);
      setError("Todoの更新に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDetailModal = (todo: TodoItem) => {
    setSelectedTodo(todo);
    setIsDetailModalOpen(true);
    console.log(isDetailModalOpen);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedTodo(null);
  };

  const handleOpenEditModal = (todo: TodoItem) => {
    setSelectedTodo(todo);
    setIsEditModalOpen(true);
    console.log(isEditModalOpen);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTodo(null);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // エラー時の表示
  if (error) {
    return <ErrorMessage error={error} />;
  }

  // ローディング状態の表示
  if (isLoading) {
    return <LoadingMessage message={loadingMessage} />;
  }

  return (
    <div>
      <div className="min-h-screen p-5">
        {!todos ? (
          <div className="mt-10 text-center text-gray-500">
            <p className="text-xl">Todoがありません</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="bg-gray-300/50 w-3/5">
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
                      <span className="flex-1 text-xl truncate">
                        {todo.title}
                      </span>
                      <button
                        className="px-2 py-1 text-white bg-blue-500 rounded cursor-pointer"
                        onClick={() => handleOpenDetailModal(todo)}
                      >
                        詳細
                      </button>
                      <button
                        className="px-2 py-1 text-white bg-green-500 rounded cursor-pointer"
                        onClick={() => handleOpenEditModal(todo)}
                      >
                        編集
                      </button>
                      <button className="px-2 py-1 text-white bg-red-500 rounded cursor-pointer">
                        削除
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
        {selectedTodo && (
          <>
            <DetailModal
              modalMode="詳細"
              selectedTodo={selectedTodo}
              isOpen={isDetailModalOpen}
              onClose={closeDetailModal}
            />

            <EditModal
              modalMode="編集"
              selectedTodo={selectedTodo}
              isOpen={isEditModalOpen}
              onClose={closeEditModal}
              onUpdate={handleUpdateTodo}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Todos;
