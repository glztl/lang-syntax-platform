import type { ReactNode } from 'react';

interface DocsLayoutProps {
  children: ReactNode;
}

export const DocsLayout = ({ children }: DocsLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* 左侧导航区域 - 固定宽度，支持折叠（后续实现） */}
      <aside className="w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
        <div className="p-4 h-full flex flex-col">
          {/* 侧边栏标题 */}
          <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              📚 导航
            </h2>
          </div>
          
          {/* 导航内容占位 - 下一步实现分级树 */}
          <div className="flex-1 py-4 text-sm text-gray-500 dark:text-gray-400">
            <p>▶️ 下一步：实现分级导航</p>
          </div>
        </div>
      </aside>

      {/* 右侧内容区域 - 可滚动 */}
      <main className="flex-1 overflow-y-auto scrollbar-thin">
        {children}
      </main>
    </div>
  );
};