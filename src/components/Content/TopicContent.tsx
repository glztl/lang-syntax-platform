// src/components/Content/TopicContent.tsx - 更新
import type { FC } from 'react';
import type { SyntaxTopic } from '../../data/types';
import { CodeTabs } from '../CodeTabs/CodeTabs';
import { getAdjacentTopics } from '../../data/navigation';

interface TopicContentProps {
  topic: SyntaxTopic;
  onNavigate: (id: string) => void;  // 新增：导航回调
}

export const TopicContent: FC<TopicContentProps> = ({ topic, onNavigate }) => {
  const { prev, next } = getAdjacentTopics(topic.id);

  return (
    <article className="max-w-4xl mx-auto">
      {/* 标题 + 描述 (保持不变) */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {topic.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {topic.description}
        </p>
        
        {topic.comparisonTips && (
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 
                         rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              🔍 <strong>对比提示：</strong> {topic.comparisonTips}
            </p>
          </div>
        )}
      </header>

      {/* 代码卡片 (保持不变) */}
      <CodeTabs snippets={topic.snippets} topicId={topic.id} />

      {/* 相关知识点 (保持不变) */}
      {topic.relatedTopics && topic.relatedTopics.length > 0 && (
        <nav className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            📖 相关知识点：
          </h3>
          <div className="flex flex-wrap gap-2">
            {topic.relatedTopics.map(id => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 
                           text-gray-700 dark:text-gray-300 rounded-full
                           hover:bg-primary-100 dark:hover:bg-primary-900/30
                           hover:text-primary-600 dark:hover:text-primary-400
                           transition-colors"
              >
                {id}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* 上一页/下一页导航 (新增) */}
      <nav className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 
                      flex justify-between items-center">
        {/* 上一页 */}
        {prev ? (
          <button
            onClick={() => onNavigate(prev)}
            className="group flex items-center gap-2 px-4 py-2 
                       text-gray-600 dark:text-gray-400 
                       hover:text-primary-600 dark:hover:text-primary-400
                       transition-colors"
          >
            <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
            <div className="text-left">
              <p className="text-xs text-gray-500">上一页</p>
              <p className="text-sm font-medium">{prev}</p>
            </div>
          </button>
        ) : (
          <div /> /* 占位 */
        )}

        {/* 下一页 */}
        {next ? (
          <button
            onClick={() => onNavigate(next)}
            className="group flex items-center gap-2 px-4 py-2 
                       text-gray-600 dark:text-gray-400 
                       hover:text-primary-600 dark:hover:text-primary-400
                       transition-colors"
          >
            <div className="text-right">
              <p className="text-xs text-gray-500">下一页</p>
              <p className="text-sm font-medium">{next}</p>
            </div>
            <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
          </button>
        ) : (
          <div /> /* 占位 */
        )}
      </nav>
    </article>
  );
};