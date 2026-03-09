// src/App.tsx
import { useState } from 'react';
import { DocsLayout } from './components/Layout/DocsLayout';
import { TopicContent } from './components/Content/TopicContent';
import { syntaxTopics } from './data/syntax-knowledge';

function App() {
  const [activeTopicId, setActiveTopicId] = useState<string>('basic-types');

  // 根据 ID 获取知识点数据
  const activeTopic = syntaxTopics[activeTopicId];

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
          多语言语法速查 · Java / Python / Go / TypeScript
        </p>
      </header>

      {/* 页面主体内容 */}
      <div className="p-6">
        {activeTopic ? (
          <TopicContent topic={activeTopic} />
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>❌ 知识点未找到：{activeTopicId}</p>
          </div>
        )}
      </div>
    </DocsLayout>
  );
}

export default App;