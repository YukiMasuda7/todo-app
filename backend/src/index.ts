import { PrismaClient } from "@prisma/client";
import express, { type Request, type Response } from "express";
import { z } from "zod";

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

// 4. レスポンス型
interface GetItemsResponse {
  items: TodoItem[];
}

interface CreateItemResponse {
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

//全てのtodoを取得
app.get(
  "/items",
  async (req: Request, res: Response<GetItemsResponse | ErrorResponse>) => {
    try {
      const items = await prisma.todo.findMany();
      return res.status(200).json({ items });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to get Items" });
    }
  }
);

//新たなtodoを作成
app.post(
  "/items",
  async (
    req: Request<{}, CreateItemResponse | ErrorResponse, CreateTodoRequest>,
    res: Response<CreateItemResponse | ErrorResponse>
  ) => {
    try {
      const validatedData = createTodoSchema.parse(req.body);
      const { title, content } = validatedData;

      const newItem = await prisma.todo.create({
        data: {
          title: title.trim(), // .trim()は前後の空白のみ除去
          content,
        },
      });
      return res.status(201).json({ item: newItem });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const firstError = err.issues[0]; // errors ではなく issues
        return res.status(400).json({
          error: firstError ? firstError.message : "バリデーションエラー",
        });
      }
      console.log(err);
      return res.status(500).json({ error: "Failed to create item" });
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
