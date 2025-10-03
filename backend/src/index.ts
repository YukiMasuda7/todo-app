import { PrismaClient } from "@prisma/client";
import express, { type Request, type Response } from "express";
import { z } from "zod";
import cors from "cors";

// 1. 基本的なエンティティ型
interface TodoItem {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 2. バリデーションスキーマ
const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .refine(
      (val) => val.trim().length > 0,
      "タイトルに有効な文字を入力してください"
    ),
  content: z.string(),
});

// 3. リクエスト型
type CreateTodoRequest = z.infer<typeof createTodoSchema>;

type EditTodoRequest = z.infer<typeof createTodoSchema>;

// 4. レスポンス型
interface GetItemsResponse {
  items: TodoItem[];
}

interface TodoItemResponse {
  item: TodoItem;
}

// 5. 共通型
interface ErrorResponse {
  error: string;
}

const app = express();
const prisma = new PrismaClient();
const port = 5000;

app.use(express.json());
app.use(cors());

// 全てのtodoを取得
app.get(
  "/items",
  async (req: Request, res: Response<GetItemsResponse | ErrorResponse>) => {
    try {
      const items = await prisma.todo.findMany();
      return res.status(200).json({ items });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to get items" });
    }
  }
);

// 新たなtodoを作成
app.post(
  "/items",
  async (
    req: Request<{}, TodoItemResponse | ErrorResponse, CreateTodoRequest>,
    res: Response<TodoItemResponse | ErrorResponse>
  ) => {
    try {
      const validatedData = createTodoSchema.parse(req.body);
      const { title, content } = validatedData;

      const newItem = await prisma.todo.create({
        data: {
          title: title.trim(),
          content: content.trim(),
        },
      });
      return res.status(201).json({ item: newItem });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const firstError = err.issues[0];
        return res.status(400).json({
          error: firstError ? firstError.message : "Validation error",
        });
      }
      console.log(err);
      return res.status(500).json({ error: "Failed to create item" });
    }
  }
);

// 既存のtodoを削除
app.delete(
  "/items/:id",
  async (
    req: Request<{ id: string }>,
    res: Response<TodoItemResponse | ErrorResponse>
  ) => {
    try {
      const { id } = req.params;
      const numericId = Number(id);

      // idがnumber型になっているかの判定
      if (isNaN(numericId)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      const deletedItem = await prisma.todo.delete({
        where: { id: numericId },
      });

      return res.status(200).json({ item: deletedItem });
    } catch (err) {
      // idが存在するのかの判定
      if (err instanceof Error && "code" in err && err.code === "P2025") {
        return res.status(404).json({ error: "Todo not found" });
      }

      console.log(err);
      return res.status(500).json({ error: "Failed to delete item" });
    }
  }
);

// 既存のtodoの編集
app.patch(
  "/items/:id",
  async (
    req: Request<
      { id: string },
      TodoItemResponse | ErrorResponse,
      EditTodoRequest
    >,
    res: Response<TodoItemResponse | ErrorResponse>
  ) => {
    try {
      const { id } = req.params;
      const numericId = Number(id);

      if (isNaN(numericId)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      const validatedData = createTodoSchema.parse(req.body);
      const { title, content } = validatedData;

      const editedItem = await prisma.todo.update({
        where: { id: numericId },
        data: {
          title: title.trim(),
          content: content.trim(),
        },
      });
      return res.status(200).json({ item: editedItem });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const firstError = err.issues[0];
        return res.status(400).json({
          error: firstError ? firstError.message : "Validation error",
        });
      }
      if (err instanceof Error && "code" in err && err.code === "P2025") {
        return res.status(404).json({ error: "Todo not found" });
      }
      console.log(err);
      return res.status(500).json({ error: "Failed to edit item" });
    }
  }
);

// todoのcompleted状態の変更
app.patch(
  "/items/:id/status",
  async (
    req: Request<{ id: string }>,
    res: Response<TodoItemResponse | ErrorResponse>
  ) => {
    try {
      const { id } = req.params;
      const numericId = Number(id);

      if (isNaN(numericId)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      const currentTodo = await prisma.todo.findUnique({
        where: { id: numericId },
      });

      if (!currentTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      const updatedItem = await prisma.todo.update({
        where: { id: numericId },
        data: {
          completed: !currentTodo.completed,
        },
      });

      return res.status(200).json({ item: updatedItem });
    } catch (err) {
      if (err instanceof Error && "code" in err && err.code === "P2025") {
        return res.status(404).json({ error: "Todo not found" });
      }

      console.log(err);
      return res.status(500).json({ error: "Failed to toggle item status" });
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
