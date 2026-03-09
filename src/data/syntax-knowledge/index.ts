// src/data/syntax-knowledge/index.ts
import type { SyntaxTopic } from '../types';
import { basicTypes } from './basic-types';
import { variables } from './variables';

// 所有知识点映射（方便按 ID 查找）
export const syntaxTopics: Record<string, SyntaxTopic> = {
  'basic-types': basicTypes,
  'variables': variables,
  // 后续添加更多...
};

// 导出所有（方便遍历）
export const allTopics: SyntaxTopic[] = [
  basicTypes,
  variables,
];