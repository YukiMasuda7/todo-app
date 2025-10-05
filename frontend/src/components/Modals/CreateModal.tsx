"use client";
import React, { useState } from "react";
import CommonModal from "./CommonModal";

interface CreateModalProps {
  modalMode: string;
  isOpen: boolean;
  onClose: () => void;
  onCreate: (createData: { title: string; content: string }) => Promise<void>;
}

const CreateModal: React.FC<CreateModalProps> = ({
  modalMode,
  isOpen,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <CommonModal modalMode={modalMode} isOpen={isOpen} onClose={onClose}>
      <input
        type="text"
        className="w-full p-2 bg-gray-50 border border-gray-300 rounded-2xl"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タイトルを入力してください"
      />
      <textarea
        className="w-full h-3/5 p-2 my-4 bg-gray-50 border border-gray-300 rounded-2xl whitespace-pre-wrap overflow-y-auto"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="概要を入力してください"
      />
      <div className="flex items-center justify-end h-1/5 p-2">
        <button
          className="px-2 py-1 text-white bg-amber-500 hover:bg-amber-600 rounded cursor-pointer"
          onClick={() => onCreate({ title, content })}
        >
          作成
        </button>
      </div>
    </CommonModal>
  );
};

export default CreateModal;
