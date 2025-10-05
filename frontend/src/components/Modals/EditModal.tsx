"use client";
import React, { useState } from "react";
import CommonModal from "./CommonModal";
import { TodoItem } from "@/types";
import { todoApi } from "@/lib/api";

interface EditModalProps {
  modalMode: string;
  selectedTodo: TodoItem;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (
    id: number,
    updateData: { title: string; content: string }
  ) => Promise<void>;
}

const EditModal: React.FC<EditModalProps> = ({
  modalMode,
  selectedTodo,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [title, setTitle] = useState(selectedTodo.title);
  const [content, setContent] = useState(selectedTodo.content);

  return (
    <CommonModal modalMode={modalMode} isOpen={isOpen} onClose={onClose}>
      <input
        type="text"
        className="w-full p-2  bg-gray-50 border border-gray-300 rounded-2xl"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full h-3/5 p-4 my-4 bg-gray-50 border border-gray-300 rounded-2xl whitespace-pre-wrap overflow-y-auto"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex items-center justify-end h-1/5 p-2">
        <button
          className="px-2 py-1 text-white bg-amber-500 rounded cursor-pointer"
          onClick={() => onUpdate(selectedTodo.id, { title, content })}
        >
          編集完了
        </button>
      </div>
    </CommonModal>
  );
};

export default EditModal;
