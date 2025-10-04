"use client";
import { createPortal } from "react-dom";

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10 backdrop-blur-sm">
      <div className="bg-red-200">
        <div>
          <h1>タイトル</h1>
          <button className="bg-green-200" onClick={() => onClose()}>
            閉じる
          </button>
        </div>

        <div className="bg-blue-200">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default CommonModal;
