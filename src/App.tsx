// src/App.tsx - 替换为以下内容
function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          📚 Lang Syntax Platform
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          多语言语法速查 · Java / Python / Go / TypeScript
        </p>
      </header>
      
      <main className="p-6">
        <div className="text-gray-700 dark:text-gray-300">
          👋 下一步：实现左侧导航 + 右侧代码卡片
        </div>
      </main>
    </div>
  );
}

export default App;