import type { FC } from 'react';
import { navigation } from '../../data/navigation';
import { NavItemComponent } from './NavItem';

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export const Sidebar: FC<SidebarProps> = ({ activeId, onSelect }) => {
  return (
    <nav className="space-y-1 overflow-y-auto scrollbar-thin h-full">
      {navigation.map((item) => (
        <NavItemComponent
          key={item.id}
          item={item}
          depth={0}
          activeId={activeId}
          onSelect={onSelect}
        />
      ))}
    </nav>
  );
};