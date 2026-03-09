// src/components/Sidebar/NavItem.tsx
import React, { useState } from 'react';
import type { FC } from 'react';
import type { NavItem } from '../../data/navigation';

interface NavItemProps {
  item: NavItem;
  depth: number;
  activeId: string;
  onSelect: (id: string) => void;
}

export const NavItemComponent: FC<NavItemProps> = ({
  item,
  depth,
  activeId,
  onSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const isCategory = item.type === 'category';
  const isActive = activeId === item.id;
  
  // 判断是否有子项被选中（用于保持分类展开）
//   const hasActiveChild = item.children?.some(
//     (child) => 
//       child.id === activeId || 
//       child.children?.some((c) => c.id === activeId)
//   );

  // 点击分类：展开/收起
  const handleCategoryClick = () => {
    if (isCategory) {
      setIsExpanded(!isExpanded);
    }
  };

  // 点击知识点：选中并通知父组件
  const handleTopicClick = () => {
    if (!isCategory) {
      onSelect(item.id);
    }
  };

  return (
    <div className="select-none">
      {/* 导航项按钮 */}
      <button
        onClick={isCategory ? handleCategoryClick : handleTopicClick}
        className={`
          w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium
          transition-all duration-200 flex items-center gap-2.5
          group
          ${isActive
            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
          }
        `}
        style={{ paddingLeft: `${depth * 16 + 14}px` }}
      >
        {/* 展开/收起图标（仅分类显示） */}
        {isCategory && (
          <span className={`
            text-xs transition-transform duration-200
            ${isExpanded ? 'rotate-90' : ''}
            ${isActive ? 'text-white/80' : 'text-gray-400'}
          `}>
            ▶
          </span>
        )}
        
        {/* 图标 */}
        <span className="text-base">{item.icon || '📄'}</span>
        
        {/* 标题 */}
        <span className="truncate">{item.title}</span>
        
        {/* 悬停指示器（仅非激活状态显示） */}
        {!isActive && (
          <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
            →
          </span>
        )}
      </button>

      {/* 递归渲染子项 */}
      {isCategory && isExpanded && item.children && (
        <div className="overflow-hidden transition-all duration-200">
          {item.children.map((child) => (
            <NavItemComponent
              key={child.id}
              item={child}
              depth={depth + 1}
              activeId={activeId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};