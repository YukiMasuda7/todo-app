export default function Home() {
  return (
    <div className="min-h-screen p-5">
      <div className="bg-gray-300/50 ">
        <ul>
          <li className="flex items-center gap-2 p-2 border-b">
            <input type="checkbox" />
            <span className="flex-1">タイトル</span>
            <button className="px-2 py-1 bg-blue-500 text-white rounded">
              詳細
            </button>
            <button className="px-2 py-1 bg-green-500 text-white rounded">
              編集
            </button>
            <button className="px-2 py-1 bg-red-500 text-white rounded">
              削除
            </button>
          </li>
          <li className="flex items-center gap-2 p-2 border-b">
            <input type="checkbox" />
            <span className="flex-1">タイトル</span>
            <button className="px-2 py-1 bg-blue-500 text-white rounded">
              詳細
            </button>
            <button className="px-2 py-1 bg-green-500 text-white rounded">
              編集
            </button>
            <button className="px-2 py-1 bg-red-500 text-white rounded">
              削除
            </button>
          </li>
          <li className="flex items-center gap-2 p-2 border-b">
            <input type="checkbox" />
            <span className="flex-1">タイトル</span>
            <button className="px-2 py-1 bg-blue-500 text-white rounded">
              詳細
            </button>
            <button className="px-2 py-1 bg-green-500 text-white rounded">
              編集
            </button>
            <button className="px-2 py-1 bg-red-500 text-white rounded">
              削除
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
