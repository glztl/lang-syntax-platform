// src/data/types.ts
export type Language = 'java' | 'python' | 'go' | 'typescript';

export interface CodeSnippet {
  language: Language;
  code: string;
  description?: string;
  notes?: string[];      // 语言特性说明
  output?: string;       // 可选：运行输出示例
}

export interface SyntaxTopic {
  id: string;
  title: string;
  description: string;   // 概念说明（语言无关）
  snippets: CodeSnippet[];
  comparisonTips?: string;  // 对比要点
  relatedTopics?: string[]; // 相关知识点 ID
}

// 导航项类型（复用）
export interface NavItem {
  id: string;
  title: string;
  type: 'category' | 'topic';
  children?: NavItem[];
  icon?: string;
}