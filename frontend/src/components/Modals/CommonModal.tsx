"use client";
import { TodoItem } from "@/types";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface CommonModalProps {
  todo: TodoItem;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CommonModal: React.FC<CommonModalProps> = ({
  todo,
  isOpen,
  onClose,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10 backdrop-blur-sm">
      <div className="flex flex-col w-4/5 h-4/5 px-4 bg-white rounded-2xl">
        <div className="flex items-center justify-between h-1/5 p-4 border-b">
          <h1 className="w-4/5 text-2xl font-bold truncate">{todo.title}</h1>
          <button
            className="px-2 py-1 text-white bg-blue-500 rounded cursor-pointer"
            onClick={() => onClose()}
          >
            閉じる
          </button>
        </div>

        <div className="flex-1 my-4">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default CommonModal;
