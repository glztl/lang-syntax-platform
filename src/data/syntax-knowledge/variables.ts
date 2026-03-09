// src/data/syntax-knowledge/variables.ts
import type { SyntaxTopic } from '../types';

export const variables: SyntaxTopic = {
  id: 'variables',
  title: '变量声明',
  description: '不同编程语言中变量的声明方式、作用域和可变性规则。',
  snippets: [
    {
      language: 'java',
      code: `// 局部变量
int x = 10;

// 成员变量
public class Person {
    private String name;
    public int age;
    static int count = 0;  // 静态变量
}

// final 变量（不可变）
final int MAX = 100;

// 作用域：块级、方法级、类级`,
      notes: [
        '变量必须先声明后使用',
        '访问修饰符：public/private/protected',
        'final 表示不可重新赋值'
      ]
    },
    {
      language: 'python',
      code: `# 简单声明
x = 10
name = "Python"

# 多变量赋值
a, b, c = 1, 2, 3
x = y = z = 0

# 全局变量
global_count = 0

def func():
    global global_count  # 声明使用全局变量
    global_count += 1

# 常量（约定大写，但可变）
MAX_SIZE = 100`,
      notes: [
        '无需声明，赋值即创建',
        'global 关键字用于修改全局变量',
        '常量靠命名约定（大写），无强制'
      ]
    },
    {
      language: 'go',
      code: `// var 声明
var x int = 10
var name string = "Go"

// 短声明（仅限函数内）
count := 100
message := "Hello"

// 多变量声明
var a, b int = 1, 2
x, y := 10, 20

// 常量
const Pi = 3.14
const (
    StatusOK = 200
    StatusErr = 500
)

// 零值：未初始化变量有默认值
var num int      // 0
var str string   // ""
var ok bool      // false`,
      notes: [
        '短声明 := 只能在函数内使用',
        '未初始化变量有零值',
        '不支持变量重新声明（同一作用域）'
      ]
    },
    {
      language: 'typescript',
      code: `// var（函数作用域，不推荐）
var x = 10;

// let（块级作用域，可重新赋值）
let count = 100;
count = 200;  // ✅

// const（块级作用域，不可重新赋值）
const MAX = 100;
// MAX = 200;  // ❌ 编译错误

// 类型注解
let age: number = 25;
let name: string = "TS";

// 解构赋值
const [a, b] = [1, 2];
const { x, y } = { x: 1, y: 2 };`,
      notes: [
        '优先使用 const，需要修改时用 let',
        '避免使用 var（作用域问题）',
        '支持解构赋值和类型注解'
      ]
    }
  ],
  comparisonTips: 'Java/Go 需显式声明，Python 赋值即创建，TS 可选类型注解；注意作用域规则差异（var/let/const）',
  relatedTopics: ['basic-types', 'operators', 'function-def']
};