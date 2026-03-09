import { DocsLayout } from './components/Layout/DocsLayout';

function App() {
  return (
    <DocsLayout>
      {/* 页面头部 */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 
                         backdrop-blur-sm border-b border-gray-200 dark:border-gray-700
                         px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          📚 Lang Syntax Platform
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          多语言语法速查 · Java / Python / Go / TypeScript
        </p>
      </header>

      {/* 页面主体内容 */}
      <div className="p-6 max-w-4xl mx-auto">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>👋 欢迎！</h2>
          <p>
            这是一个编程语言语法速查平台，左侧为分级导航，右侧展示多语言代码对比。
          </p>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              ✅ 当前进度：基础布局 + Tailwind 配置完成<br/>
              🎯 下一步：实现左侧分级导航树
            </p>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}

export default App;