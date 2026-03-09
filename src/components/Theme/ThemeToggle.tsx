// src/components/Theme/ThemeToggle.tsx
import type { FC } from 'react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 
                 text-gray-600 dark:text-gray-300
                 hover:bg-gray-200 dark:hover:bg-gray-600
                 transition-colors"
      title={theme === 'light' ? '切换到暗色主题' : '切换到亮色主题'}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};