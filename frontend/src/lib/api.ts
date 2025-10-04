import axios, { AxiosResponse, AxiosError } from "axios";
import { TodoItem } from "@/types";

export interface GetItemsResponse {
  items: TodoItem[];
}

export interface TodoItemResponse {
  item: TodoItem;
}

export interface ErrorResponse {
  error: string;
}

export interface CreateTodoRequest {
  title: string;
  content: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    console.error("API Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });

    if (error.response?.status === 404) {
      console.error("リソースが見つかりません");
    } else if (error.response?.status === 500) {
      console.error("サーバーエラーが発生しました");
    } else if (error.code === "ECONNREFUSED") {
      console.error("サーバーに接続できません");
    }

    return Promise.reject(error);
  }
);

export const todoApi = {
  // 全てのTodoを取得
  getAllTodos: (): Promise<AxiosResponse<GetItemsResponse>> => {
    return api.get("/items");
  },

  // Todoを作成
  createTodo: (
    data: CreateTodoRequest
  ): Promise<AxiosResponse<TodoItemResponse>> => {
    return api.post("/items", data);
  },

  // Todoを更新
  updateTodo: (
    id: number,
    data: CreateTodoRequest
  ): Promise<AxiosResponse<TodoItemResponse>> => {
    return api.patch(`/items/${id}`, data);
  },

  // Todo完了状態を切り替え
  toggleTodoStatus: (id: number): Promise<AxiosResponse<TodoItemResponse>> => {
    return api.patch(`/items/${id}/status`);
  },

  // Todoを削除
  deleteTodo: (id: number): Promise<AxiosResponse<TodoItemResponse>> => {
    return api.delete(`/items/${id}`);
  },
};

export default api;
