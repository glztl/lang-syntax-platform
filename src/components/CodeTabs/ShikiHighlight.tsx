// src/components/CodeTabs/ShikiHighlight.tsx - 完整替换
import { useEffect, useState } from 'react';
import { createHighlighter } from 'shiki';
import type { Highlighter } from 'shiki';
import type { Language } from '../../data/types';

interface ShikiHighlightProps {
  code: string;
  language: Language;
  theme: 'light' | 'dark';
}

// 单例 Highlighter（避免重复创建）
let highlighter: Highlighter | null = null;
let initPromise: Promise<Highlighter> | null = null;

// 初始化函数（Shiki v1.x API）
const getHighlighterInstance = async (): Promise<Highlighter> => {
  if (highlighter) return highlighter;
  
  if (!initPromise) {
    initPromise = createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: ['java', 'python', 'go', 'typescript'],
    }).then(h => {
      highlighter = h;
      return h;
    });
  }
  
  return initPromise;
};

export const ShikiHighlight = ({ code, language, theme }: ShikiHighlightProps) => {
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // HTML 转义辅助函数（降级时使用）
  const escapeHtml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  useEffect(() => {
    let mounted = true;

    const highlightCode = async () => {
      try {
        const h = await getHighlighterInstance();
        
        // Shiki v1.x API
        const htmlCode = h.codeToHtml(code, {
          lang: language,
          theme: theme === 'dark' ? 'github-dark' : 'github-light',
        });

        if (mounted) {
          setHtml(htmlCode);
          setLoading(false);
        }
      } catch (error) {
        console.error('Shiki highlight error:', error);
        if (mounted) {
          // 降级显示普通代码
          setHtml(`<pre><code>${escapeHtml(code)}</code></pre>`);
          setLoading(false);
        }
      }
    };

    highlightCode();

    return () => {
      mounted = false;
    };
  }, [code, language, theme]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    );
  }

  return (
    <div 
      className="shiki-container text-sm leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};