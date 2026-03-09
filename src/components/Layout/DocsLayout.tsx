// src/components/Layout/DocsLayout.tsx
import type { ReactNode } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';

interface DocsLayoutProps {
  children: ReactNode;
  activeTopicId: string;
  onTopicSelect: (id: string) => void;
}

export const DocsLayout = ({
  children,
  activeTopicId,
  onTopicSelect,
}: DocsLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* 左侧导航 */}
      <aside className="w-64 border-r border-gray-200 dark:border-gray-700 
                        bg-white dark:bg-gray-800 flex-shrink-0">
        <div className="p-4 h-full flex flex-col">
          {/* 侧边栏标题 */}
          <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white text-sm">
              📚 目录导航
            </h2>
          </div>
          
          {/* 导航树 */}
          <div className="flex-1 py-4">
            <Sidebar
              activeId={activeTopicId}
              onSelect={onTopicSelect}
            />
          </div>
        </div>
      </aside>

      {/* 右侧内容区 */}
      <main className="flex-1 overflow-y-auto scrollbar-thin">
        {children}
      </main>
    </div>
  );
};