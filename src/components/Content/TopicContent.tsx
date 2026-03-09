// src/components/Content/TopicContent.tsx - 完整替换
import type { FC } from 'react';
import type { SyntaxTopic } from '../../data/types';
import { CodeTabs } from '../CodeTabs/CodeTabs';
import { HiOutlineLightBulb, HiOutlineLink } from 'react-icons/hi';

interface TopicContentProps {
  topic: SyntaxTopic;
}

export const TopicContent: FC<TopicContentProps> = ({ topic }) => {
  return (
    <article className="space-y-8">
      {/* 标题区域 - 渐变文字 */}
      <header className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 
                       dark:from-white dark:via-gray-200 dark:to-white 
                       bg-clip-text text-transparent">
          {topic.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
          {topic.description}
        </p>
        
        {/* 对比提示卡片 */}
        {topic.comparisonTips && (
          <div className="inline-flex items-center gap-3 p-4 rounded-2xl 
                         bg-gradient-to-r from-amber-50 to-orange-50 
                         dark:from-amber-900/20 dark:to-orange-900/20 
                         border border-amber-200/60 dark:border-amber-800/60
                         backdrop-blur-sm">
            <HiOutlineLightBulb className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
              {topic.comparisonTips}
            </p>
          </div>
        )}
      </header>

      {/* 多语言代码卡片 */}
      <CodeTabs snippets={topic.snippets} topicId={topic.id} />

      {/* 相关知识点 - 标签云设计 */}
      {topic.relatedTopics && topic.relatedTopics.length > 0 && (
        <nav className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineLink className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              相关知识点
            </h3>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {topic.relatedTopics.map(id => (
              <span
                key={id}
                className="group px-4 py-2 text-sm font-medium 
                           bg-gray-100 dark:bg-gray-700/50 
                           text-gray-700 dark:text-gray-300 
                           rounded-xl border border-gray-200 dark:border-gray-600
                           hover:bg-primary-50 dark:hover:bg-primary-900/20
                           hover:border-primary-300 dark:hover:border-primary-700
                           hover:text-primary-600 dark:hover:text-primary-400
                           transition-all duration-200 cursor-pointer"
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