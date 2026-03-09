// src/App.tsx - 更新
import { useState } from 'react';
import { DocsLayout } from './components/Layout/DocsLayout';
import { TopicContent } from './components/Content/TopicContent';
import { ThemeToggle } from './components/Theme/ThemeToggle';
import { syntaxTopics } from './data/syntax-knowledge';

function App() {
  const [activeTopicId, setActiveTopicId] = useState<string>('basic-types');
  const activeTopic = syntaxTopics[activeTopicId];

  // 处理导航跳转
  const handleNavigate = (id: string) => {
    setActiveTopicId(id);
    // 跳转后滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <DocsLayout
      activeTopicId={activeTopicId}
      onTopicSelect={handleNavigate}
    >
      {/* 顶部标题栏 */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 
                         backdrop-blur-sm border-b border-gray-200 dark:border-gray-700
                         px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            📚 Lang Syntax Platform
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            多语言语法速查 · Java / Python / Go / TypeScript
          </p>
        </div>
        
        <ThemeToggle />
      </header>

      {/* 页面主体内容 */}
      <div className="p-6">
        {activeTopic ? (
          <TopicContent 
            topic={activeTopic} 
            onNavigate={handleNavigate}  // 传递导航回调
          />
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>❌ 知识点未找到：{activeTopicId}</p>
            <button 
              onClick={() => handleNavigate('basic-types')}
              className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              返回首页
            </button>
          </div>
        )}
      </div>
    </DocsLayout>
  );
}

export default App;