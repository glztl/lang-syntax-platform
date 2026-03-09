export interface NavItem {
  id: string;
  title: string;
  type: 'category' | 'topic';
  children?: NavItem[];  // 分类才有子项
  icon?: string;         // 可选图标
}

export const navigation: NavItem[] = [
  {
    id: 'basics',
    title: '基础语法',
    type: 'category',
    icon: '📦',
    children: [
      { id: 'basic-types', title: '基本类型', type: 'topic' },
      { id: 'variables', title: '变量声明', type: 'topic' },
      { id: 'operators', title: '运算符', type: 'topic' },
      { id: 'type-conversion', title: '类型转换', type: 'topic' },
    ],
  },
  {
    id: 'control-flow',
    title: '控制流',
    type: 'category',
    icon: '🔁',
    children: [
      { id: 'if-else', title: '条件语句', type: 'topic' },
      { id: 'loops', title: '循环语句', type: 'topic' },
      { id: 'switch', title: '分支语句', type: 'topic' },
    ],
  },
  {
    id: 'functions',
    title: '函数与模块',
    type: 'category',
    icon: '🧩',
    children: [
      { id: 'function-def', title: '函数定义', type: 'topic' },
      { id: 'parameters', title: '参数传递', type: 'topic' },
      { id: 'imports', title: '导入导出', type: 'topic' },
    ],
  },
  {
    id: 'data-structures',
    title: '数据结构',
    type: 'category',
    icon: '🗃️',
    children: [
      { id: 'arrays', title: '数组/列表', type: 'topic' },
      { id: 'maps', title: '字典/Map', type: 'topic' },
      { id: 'structs', title: '结构体/类', type: 'topic' },
    ],
  },
];