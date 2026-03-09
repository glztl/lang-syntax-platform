// src/App.tsx
import { useState } from 'react';
import { DocsLayout } from './components/Layout/DocsLayout';

function App() {
  // 当前选中的知识点 ID
  const [activeTopicId, setActiveTopicId] = useState<string>('basic-types');

  return (
    <DocsLayout
      activeTopicId={activeTopicId}
      onTopicSelect={setActiveTopicId}
    >
      {/* 顶部标题栏 */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 
                         backdrop-blur-sm border-b border-gray-200 dark:border-gray-700
                         px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          📚 Lang Syntax Platform
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          当前知识点：<code className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
            {activeTopicId}
          </code>
        </p>
      </header>

      {/* 页面主体内容 */}
      <div className="p-6 max-w-4xl mx-auto">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📖 {activeTopicId}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            这里是知识点内容区域。下一步我们将根据 <code>{activeTopicId}</code> 
            动态加载对应的多语言代码卡片。
          </p>
          
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm text-green-800 dark:text-green-200">
              ✅ 当前进度：分级导航树完成<br/>
              🎯 下一步：根据选中 ID 加载对应语法内容
            </p>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}

export default App;