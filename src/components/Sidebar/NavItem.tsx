import React, { useState } from 'react';
import type { FC } from 'react';
import type { NavItem } from '../../data/navigation';

interface NavItemProps {
  item: NavItem;
  depth: number;           // 当前层级（用于缩进）
  activeId: string;        // 当前选中的知识点 ID
  onSelect: (id: string) => void;
}

export const NavItemComponent: FC<NavItemProps> = ({
  item,
  depth,
  activeId,
  onSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(true); // 默认展开

  const isCategory = item.type === 'category';
  const isActive = activeId === item.id;
  const hasActiveChild = item.children?.some(
    (child) => child.id === activeId || child.children?.some((c) => c.id === activeId)
  );

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
          w-full text-left px-3 py-2 rounded-lg text-sm font-medium
          transition-all duration-200 flex items-center gap-2
          ${isActive
            ? 'bg-primary-500 text-white shadow-sm'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
          }
          ${!isCategory && hasActiveChild ? 'bg-gray-100 dark:bg-gray-700' : ''}
        `}
        style={{ paddingLeft: `${depth * 12 + 12}px` }} // 层级缩进
      >
        {/* 展开/收起图标（仅分类显示） */}
        {isCategory && (
          <span className={`
            text-xs transition-transform duration-200
            ${isExpanded ? 'rotate-90' : ''}
          `}>
            ▶
          </span>
        )}
        
        {/* 图标 + 标题 */}
        <span>{item.icon || '📄'}</span>
        <span className="truncate">{item.title}</span>
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