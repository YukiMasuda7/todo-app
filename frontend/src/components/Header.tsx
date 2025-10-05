import React from "react";

interface HeaderProps {
  onCreateClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateClick }) => {
  return (
    <div className="bg-blue-400 py-3 text-3xl text-white flex items-center">
      <div className="w-1/3"></div>
      <div className="w-1/3 text-center">ToDo</div>
      <div className="w-1/3 flex justify-end pr-4">
        <button
          className="px-4 py-2 text-lg bg-amber-500 hover:bg-amber-600 rounded cursor-pointer"
          onClick={onCreateClick}
        >
          新規作成
        </button>
      </div>
    </div>
  );
};

export default Header;
