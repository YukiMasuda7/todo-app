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
  const [titleError, setTitleError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateTitle = (value: string) => {
    if (!value.trim()) {
      return "タイトルは必須です";
    }
    if (value.trim().length === 0) {
      return "タイトルに有効な文字を入力してください";
    }
    return "";
  };

  // タイトル変更時の処理
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);

    // リアルタイムバリデーション
    const error = validateTitle(value);
    setTitleError(error);
  };

  const handleSubmit = async () => {
    const error = validateTitle(title);
    setTitleError(error);

    if (error) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onCreate({ title: title.trim(), content });

      setTitle("");
      setContent("");
      setTitleError("");
    } catch (err) {
      console.error("Failed to create todo:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setContent("");
    setTitleError("");
    onClose();
  };

  return (
    <CommonModal modalMode={modalMode} isOpen={isOpen} onClose={handleClose}>
      <div className="mb-4">
        <input
          type="text"
          className={`w-full p-2 bg-gray-50 border rounded-2xl ${
            titleError ? "border-red-500" : "border-gray-300"
          }`}
          value={title}
          onChange={handleTitleChange}
          placeholder="タイトルを入力してください"
        />
        {titleError && (
          <p className="mt-1 text-sm text-red-500">{titleError}</p>
        )}
      </div>

      <textarea
        className="w-full h-3/5 p-2 mb-4 bg-gray-50 border border-gray-300 rounded-2xl whitespace-pre-wrap overflow-y-auto"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="概要を入力してください"
      />

      <div className="flex items-center justify-end">
        <button
          className={`px-4 py-2 text-white rounded cursor-pointer ${
            titleError || !title.trim() || isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-600"
          }`}
          onClick={handleSubmit}
          disabled={titleError !== "" || !title.trim() || isSubmitting}
        >
          {isSubmitting ? "作成中..." : "作成"}
        </button>
      </div>
    </CommonModal>
  );
};

export default CreateModal;
