"use client";
import React from "react";
import CommonModal from "./CommonModal";
import { TodoItem } from "@/types";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose }) => {
  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <div>これがDetailの中身</div>
    </CommonModal>
  );
};

export default DetailModal;
