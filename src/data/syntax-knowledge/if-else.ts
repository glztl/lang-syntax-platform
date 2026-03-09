// src/data/syntax-knowledge/if-else.ts
import type { SyntaxTopic } from '../types';

export const ifElse: SyntaxTopic = {
  id: 'if-else',
  title: '条件语句',
  description: '根据布尔表达式的真假来决定执行哪段代码逻辑。',
  snippets: [
    {
      language: 'java',
      code: `int score = 85;

// 基本 if-else
if (score >= 90) {
    System.out.println("优秀");
} else if (score >= 60) {
    System.out.println("及格");
} else {
    System.out.println("不及格");
}

// 三元运算符
String result = (score >= 60) ? "及格" : "不及格";

// switch 语句
switch (score / 10) {
    case 10:
    case 9:
        System.out.println("A");
        break;
    default:
        System.out.println("其他");
}`,
      notes: [
        '条件必须是布尔表达式',
        'switch 支持 String (Java 7+)',
        'Java 14+ 支持 switch 表达式'
      ]
    },
    {
      language: 'python',
      code: `score = 85

# 基本 if-elif-else (注意缩进)
if score >= 90:
    print("优秀")
elif score >= 60:
    print("及格")
else:
    print("不及格")

# 三元表达式
result = "及格" if score >= 60 else "不及格"

# match-case (Python 3.10+)
match score // 10:
    case 10 | 9:
        print("A")
    case _:
        print("其他")`,
      notes: [
        '用缩进表示代码块，无需大括号',
        'elif 代替 else if',
        '3.10+ 支持 structural pattern matching'
      ]
    },
    {
      language: 'go',
      code: `score := 85

// 基本 if-else (支持初始化语句)
if score >= 90 {
    fmt.Println("优秀")
} else if score >= 60 {
    fmt.Println("及格")
} else {
    fmt.Println("不及格")
}

// if 带初始化
if grade := score / 10; grade >= 9 {
    fmt.Println("A")
}

// switch (无需 break，自动中断)
switch score / 10 {
case 10, 9:
    fmt.Println("A")
default:
    fmt.Println("其他")
}`,
      notes: [
        '条件无需括号，代码块必须大括号',
        'if 支持初始化语句（变量作用域仅限 if 内）',
        'switch 默认自动 break'
      ]
    },
    {
      language: 'typescript',
      code: `let score = 85;

// 基本 if-else
if (score >= 90) {
    console.log("优秀");
} else if (score >= 60) {
    console.log("及格");
} else {
    console.log("不及格");
}

// 三元运算符
let result = (score >= 60) ? "及格" : "不及格";

// switch 语句
switch (Math.floor(score / 10)) {
    case 10:
    case 9:
        console.log("A");
        break;
    default:
        console.log("其他");
}

// 可选链 + 空值合并
let status = user?.isActive ?? false;`,
      notes: [
        '结构与 Java/C 类似',
        '支持三元运算符',
        'switch 需要手动 break'
      ]
    }
  ],
  comparisonTips: 'Python 用缩进和 elif，Go 的 if 支持初始化语句且 switch 自动 break，TS/Java 需手动 break',
  relatedTopics: ['operators', 'loops', 'function-def']
};