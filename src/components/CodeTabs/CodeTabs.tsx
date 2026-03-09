import { useState, useEffect, useCallback } from 'react';
import type { CodeSnippet, Language } from '../../data/types';
import { highlightCode, getCurrentTheme } from '../../utils/highlight';

interface CodeTabsProps {
  snippets: CodeSnippet[];
  topicId: string;
}

const languageLabels: Record<Language, string> = {
  java: 'Java',
  python: 'Python',
  go: 'Go',
  typescript: 'TypeScript',
};

const languageColors: Record<Language, string> = {
  java: 'text-orange-600 dark:text-orange-400',
  python: 'text-blue-600 dark:text-blue-400',
  go: 'text-cyan-600 dark:text-cyan-400',
  typescript: 'text-blue-500 dark:text-blue-400',
};

export const CodeTabs = ({ snippets, topicId }: CodeTabsProps) => {
  // 1. 语言偏好状态
  const [activeLang, setActiveLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang-preference') as Language;
    if (saved && snippets.some((s) => s.language === saved)) {
      return saved;
    }
    return snippets[0]?.language || 'python';
  });

  // 2. 高亮相关状态
  const [highlightedHtml, setHighlightedHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 3. 高亮代码函数（用 useCallback 避免重复创建）
  const highlightActiveCode = useCallback(async () => {
    const activeSnippet = snippets.find((s) => s.language === activeLang);
    if (!activeSnippet) return;

    setIsLoading(true);
    const theme = getCurrentTheme();

    try {
      const html = await highlightCode(
        activeSnippet.code,
        activeSnippet.language,
        theme
      );
      setHighlightedHtml(html);
    } catch (error) {
      console.error('Highlight error:', error);
      // 降级方案：显示纯文本代码块
      const escaped = activeSnippet.code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      setHighlightedHtml(`<pre class="shiki-container"><code>${escaped}</code></pre>`);
    } finally {
      setIsLoading(false);
    }
  }, [activeLang, snippets]);

  // 4. 初始加载 + 语言切换时重新高亮
  useEffect(() => {
    highlightActiveCode();
  }, [highlightActiveCode]);

  // 5. 监听主题切换事件
  useEffect(() => {
    const handleThemeChange = () => {
      highlightActiveCode();
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => {
      window.removeEventListener('theme-change', handleThemeChange);
    };
  }, [highlightActiveCode]);

  // 6. 同步语言偏好到 localStorage + 广播
  useEffect(() => {
    localStorage.setItem('lang-preference', activeLang);
    window.dispatchEvent(
      new CustomEvent('lang-preference-change', {
        detail: { language: activeLang },
      })
    );
  }, [activeLang]);

  // 7. 监听其他代码块的语言切换（实现页面内同步）
  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newLang = customEvent.detail?.language as Language;
      if (newLang && snippets.some((s) => s.language === newLang)) {
        setActiveLang(newLang);
      }
    };
    window.addEventListener('lang-preference-change', handleLangChange);
    return () => {
      window.removeEventListener('lang-preference-change', handleLangChange);
    };
  }, [snippets]);

  // 8. 复制代码功能
  const handleCopy = async () => {
    const activeSnippet = snippets.find((s) => s.language === activeLang);
    if (activeSnippet) {
      await navigator.clipboard.writeText(activeSnippet.code);
      // 简单视觉反馈
      const btn = document.getElementById(`copy-btn-${topicId}`);
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = '✅';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 1500);
      }
    }
  };

  const activeSnippet = snippets.find((s) => s.language === activeLang);

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
      {/* ========== 语言切换 Tab ========== */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 overflow-x-auto">
        {snippets.map((snippet) => {
          const isActive = activeLang === snippet.language;
          return (
            <button
              key={snippet.language}
              onClick={() => setActiveLang(snippet.language)}
              className={`
                px-4 py-3 text-sm font-medium transition-all duration-200
                border-b-2 whitespace-nowrap
                ${
                  isActive
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400 bg-white dark:bg-gray-800'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              `}
            >
              <span className={languageColors[snippet.language]}>
                {languageLabels[snippet.language]}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========== 代码展示区 ========== */}
      <div className="relative">
        {/* 复制按钮 - 用 topicId 确保唯一性 */}
        <button
          id={`copy-btn-${topicId}`}
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm z-10"
          title="复制代码"
          aria-label="复制代码"
        >
          📋
        </button>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <span className="animate-pulse">⏳ 加载代码高亮...</span>
            </div>
          ) : (
            <div
              className="shiki-container"
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          )}
        </div>

        {/* 语言特性说明 */}
        {activeSnippet?.notes && activeSnippet.notes.length > 0 && (
          <div className="px-4 pb-4 pt-2">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-2">
                💡 {languageLabels[activeSnippet.language]} 特性：
              </p>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">
                {activeSnippet.notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};