"use client";
import React from "react";
import CommonModal from "./CommonModal";
import { TodoItem } from "@/types";

interface ConfirmDeleteModalProps {
  modalMode: string;
  selectedTodo: TodoItem;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => Promise<void>;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  modalMode,
  selectedTodo,
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <CommonModal modalMode={modalMode} isOpen={isOpen} onClose={onClose}>
      <div className="text-center font-bold text-2xl">{selectedTodo.title}</div>
      <div className="w-full h-3/5 p-2 my-2 border border-gray-300 rounded-2xl whitespace-pre-wrap overflow-y-auto">
        {selectedTodo.content}
      </div>
      <div className="flex justify-end">
        <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 flex-1">
          <div className="font-bold text-center">状態</div>
          <div>：{selectedTodo.completed ? "完了" : "未完了"}</div>

          <div className="font-bold text-center">作成日</div>
          <div>
            ：{new Date(selectedTodo.createdAt).toLocaleDateString("ja-JP")}
          </div>

          <div className="font-bold text-center">最終更新日</div>
          <div>
            ：{new Date(selectedTodo.updatedAt).toLocaleDateString("ja-JP")}
          </div>
        </div>

        <div className="flex items-center p-4">
          <button
            className="px-2 py-1 text-white bg-red-500 hover:bg-red-600 rounded cursor-pointer"
            onClick={() => onDelete(selectedTodo.id)}
          >
            削除
          </button>
        </div>
      </div>
    </CommonModal>
  );
};

export default ConfirmDeleteModal;
