// src/components/CodeTabs/CodeTabs.tsx
import { useState, useEffect } from 'react';
import type { CodeSnippet, Language } from '../../data/types';

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
  java: 'text-orange-600',
  python: 'text-blue-600',
  go: 'text-cyan-600',
  typescript: 'text-blue-500',
};

export const CodeTabs = ({ snippets }: CodeTabsProps) => {
  const [activeLang, setActiveLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang-preference') as Language;
    if (saved && snippets.some(s => s.language === saved)) {
      return saved;
    }
    return snippets[0]?.language || 'python';
  });

  useEffect(() => {
    localStorage.setItem('lang-preference', activeLang);
    window.dispatchEvent(new CustomEvent('lang-preference-change', {
      detail: { language: activeLang }
    }));
  }, [activeLang]);

  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newLang = customEvent.detail?.language as Language;
      if (newLang && snippets.some(s => s.language === newLang)) {
        setActiveLang(newLang);
      }
    };
    window.addEventListener('lang-preference-change', handleLangChange);
    return () => window.removeEventListener('lang-preference-change', handleLangChange);
  }, [snippets]);

  const activeSnippet = snippets.find(s => s.language === activeLang);

  const handleCopy = async () => {
    if (activeSnippet) {
      await navigator.clipboard.writeText(activeSnippet.code);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
      
      {/* 语言切换 Tab */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 overflow-x-auto">
        {snippets.map(snippet => (
          <button
            key={snippet.language}
            onClick={() => setActiveLang(snippet.language)}
            className={`
              px-4 py-3 text-sm font-medium transition-all duration-200
              border-b-2 whitespace-nowrap
              ${activeLang === snippet.language
                ? 'border-primary-500 text-primary-600 bg-white dark:bg-gray-800'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
          >
            <span className={languageColors[snippet.language]}>
              {languageLabels[snippet.language]}
            </span>
          </button>
        ))}
      </div>

      {/* 代码展示区 */}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-xs"
          title="复制代码"
        >
          📋
        </button>

        <div className="p-4 overflow-x-auto">
          {activeSnippet && (
            <pre className="text-sm leading-relaxed font-mono bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-gray-800 dark:text-gray-200">
              <code>{activeSnippet.code}</code>
            </pre>
          )}
        </div>

        {/* 语言特性说明 */}
        {activeSnippet?.notes && (
          <div className="px-4 pb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-2">
                💡 {languageLabels[activeSnippet.language]} 特性：
              </p>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                {activeSnippet.notes.map((note, idx) => (
                  <li key={idx}>• {note}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};