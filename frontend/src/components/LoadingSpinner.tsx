"use client";
import React from "react";

const LoadingSpinner = () => {
  return (
    <>
      <div className="min-h-screen p-5 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-lg text-gray-600">読み込み中...</p>
        </div>
      </div>
    </>
  );
};

export default LoadingSpinner;
