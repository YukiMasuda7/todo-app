import React from "react";
import { MdErrorOutline } from "react-icons/md";

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div>
      <div className="min-h-screen p-5 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <MdErrorOutline className="h-12 w-12 text-red-500" />
          <p className="text-lg text-gray-600">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
