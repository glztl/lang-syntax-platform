// src/components/Content/TopicContent.tsx
import type { FC } from 'react';
import type { SyntaxTopic } from '../../data/types';
import { CodeTabs } from '../CodeTabs/CodeTabs';

interface TopicContentProps {
  topic: SyntaxTopic;
}

export const TopicContent: FC<TopicContentProps> = ({ topic }) => {
  return (
    <article className="max-w-4xl mx-auto">
      {/* 标题 + 描述 */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {topic.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {topic.description}
        </p>
        
        {/* 对比提示 */}
        {topic.comparisonTips && (
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 
                         rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              🔍 <strong>对比提示：</strong> {topic.comparisonTips}
            </p>
          </div>
        )}
      </header>

      {/* 多语言代码卡片 */}
      <CodeTabs snippets={topic.snippets} topicId={topic.id} />

      {/* 相关知识点 */}
      {topic.relatedTopics && topic.relatedTopics.length > 0 && (
        <nav className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            📖 相关知识点：
          </h3>
          <div className="flex flex-wrap gap-2">
            {topic.relatedTopics.map(id => (
              <span
                key={id}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 
                           text-gray-700 dark:text-gray-300 rounded-full"
              >
                {id}
              </span>
            ))}
          </div>
        </nav>
      )}
    </article>
  );
};