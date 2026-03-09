// src/components/Layout/DocsLayout.tsx - 完整替换
import type { ReactNode } from 'react';
// import { ThemeToggle } from '../Theme/ThemeToggle';
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
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-primary-50/30 
                    dark:from-gray-900 dark:via-gray-900 dark:to-primary-900/20">
      
      {/* 左侧导航 - 毛玻璃效果 */}
      <aside className="w-72 border-r border-gray-200/60 dark:border-gray-700/60 
                        bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl 
                        flex-shrink-0 shadow-soft">
        <div className="p-5 h-full flex flex-col">
          {/* Logo 区域 */}
          <div className="pb-5 border-b border-gray-200/60 dark:border-gray-700/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 
                               flex items-center justify-center shadow-glow">
                  <span className="text-white text-lg">📚</span>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white text-sm">
                    Lang Syntax
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    多语言速查平台
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 导航树 */}
          <div className="flex-1 py-4 overflow-y-auto scrollbar-thin -mx-2 px-2">
            <Sidebar
              activeId={activeTopicId}
              onSelect={onTopicSelect}
            />
          </div>

          {/* 底部信息 */}
          <div className="pt-4 border-t border-gray-200/60 dark:border-gray-700/60 mt-auto">
            <p className="text-xs text-center text-gray-400 dark:text-gray-500">
              v1.0 · Java / Python / Go / TS
            </p>
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