"use client";
import React from "react";
import CommonModal from "./CommonModal";
import { TodoItem } from "@/types";

interface DetailModalProps {
  todo: TodoItem;
  isOpen: boolean;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ todo, isOpen, onClose }) => {
  return (
    <CommonModal todo={todo} isOpen={isOpen} onClose={onClose}>
      <div className="w-full h-3/5 p-4 mb-4 bg-gray-50 border border-gray-300 rounded-2xl whitespace-pre-wrap overflow-y-auto">
        {todo.content}
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
        <div className="font-bold text-center">状態</div>
        <div>：{todo.completed ? "完了" : "未完了"}</div>

        <div className="font-bold text-center">作成日</div>
        <div>：{new Date(todo.createdAt).toLocaleDateString("ja-JP")}</div>

        <div className="font-bold text-center">最終更新日</div>
        <div>：{new Date(todo.updatedAt).toLocaleDateString("ja-JP")}</div>
      </div>
    </CommonModal>
  );
};

export default DetailModal;
