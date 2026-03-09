// src/utils/highlight.ts
import {
  createHighlighter,
  type Highlighter,
  type BuiltinTheme,
  type BundledLanguage,
} from 'shiki';

// 单例缓存
let highlighter: Highlighter | null = null;

// 预定义支持的语言（类型安全 + 运行时校验）
export const SUPPORTED_LANGUAGES: readonly BundledLanguage[] = [
  'java',
  'python',
  'go',
  'typescript',
  // 按需扩展...
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// 校验语言是否支持（运行时）
export const isSupportedLanguage = (lang: string): lang is SupportedLanguage => {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(lang);
};

// 初始化 highlighter
export const initHighlighter = async () => {
  if (highlighter) return highlighter;

  highlighter = await createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: [...SUPPORTED_LANGUAGES],
  });

  return highlighter;
};

// 高亮代码（主函数）
export const highlightCode = async (
  code: string,
  lang: string,  // 外部传入可能是任意 string
  theme: 'light' | 'dark' = 'light'
): Promise<string> => {
  const hl = await initHighlighter();
  
  // 类型收窄：校验并断言
  if (!isSupportedLanguage(lang)) {
    console.warn(`Language "${lang}" not supported, fallback to plaintext`);
    // 降级：返回纯文本
    const escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<pre><code>${escaped}</code></pre>`;
  }

  const themeName: BuiltinTheme = 
    theme === 'dark' ? 'github-dark' : 'github-light';
  
  //
  return hl.codeToHtml(code, {
    lang,
    theme: themeName,
  });
};

// 获取当前主题
export const getCurrentTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

// 可选：动态加载新语言（类型安全版本）
export const loadLanguage = async (lang: string) => {
  if (!isSupportedLanguage(lang)) {
    throw new Error(`Unsupported language: ${lang}`);
  }
  
  const hl = await initHighlighter();
  await hl.loadLanguage(lang);
};