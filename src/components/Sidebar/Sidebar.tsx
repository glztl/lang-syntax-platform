import type { FC } from 'react';

export const Sidebar: FC = () => {
  return (
    <nav className="space-y-1">
      {/* 模拟一个导航项 - 后续替换为动态渲染 */}
      <button
        className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium
                   text-gray-700 hover:bg-gray-100 
                   dark:text-gray-300 dark:hover:bg-gray-700
                   transition-colors"
      >
        🔹 基础语法
      </button>
      
      <button
        className="w-full text-left px-3 py-2 rounded-lg text-sm
                   text-gray-600 hover:bg-gray-100
                   dark:text-gray-400 dark:hover:bg-gray-700
                   transition-colors"
      >
        &nbsp;&nbsp;• 基本类型
      </button>
    </nav>
  );
};