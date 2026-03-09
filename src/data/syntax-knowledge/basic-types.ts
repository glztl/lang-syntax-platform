// src/data/syntax-knowledge/basic-types.ts
import type { SyntaxTopic } from '../types';

export const basicTypes: SyntaxTopic = {
  id: 'basic-types',
  title: '基本数据类型',
  description: '编程语言中最基础的数据类型定义方式，包括整数、浮点数、布尔值和字符串。',
  snippets: [
    {
      language: 'java',
      code: `// 整数类型
int age = 25;
long bigNumber = 1000000L;

// 浮点类型
double price = 19.99;
float ratio = 3.14f;

// 布尔类型
boolean isActive = true;

// 字符串（引用类型）
String name = "Hello, Java!";

// 字符类型
char grade = 'A';`,
      notes: [
        'Java 是静态类型语言，声明时必须指定类型',
        'String 是引用类型，不是基本类型',
        'char 使用单引号，String 使用双引号'
      ]
    },
    {
      language: 'python',
      code: `# 整数（自动处理大数）
age = 25
big_number = 1000000

# 浮点数
price = 19.99
ratio = 3.14

# 布尔类型（首字母大写）
is_active = True

# 字符串
name = "Hello, Python!"
message = '单引号也可以'

# 类型查看
print(type(age))    # <class 'int'>
print(type(price))  # <class 'float'>`,
      notes: [
        'Python 是动态类型，无需声明类型',
        '布尔值首字母大写：True/False',
        '字符串可用单引号或双引号'
      ]
    },
    {
      language: 'go',
      code: `// 显式类型声明
var age int = 25
var price float64 = 19.99
var isActive bool = true
var name string = "Hello, Go!"

// 短变量声明（推荐）
count := 100
ratio := 3.14
enabled := false

// 常量
const Pi = 3.14159
const MaxSize = 100`,
      notes: [
        'Go 支持 := 短变量声明（类型自动推断）',
        '变量名首字母大写表示导出（公开）',
        '没有 class，只有 struct'
      ]
    },
    {
      language: 'typescript',
      code: `// 类型注解（推荐但可选）
let age: number = 25;
let price: number = 19.99;
let isActive: boolean = true;
let name: string = "Hello, TypeScript!";

// 类型推断（可省略类型注解）
let count = 100;        // 推断为 number
let message = "Hi";     // 推断为 string

// 常量
const PI = 3.14159;
const MAX_SIZE = 100;

// 联合类型
let id: number | string = 123;
id = "ABC";  // ✅ 合法`,
      notes: [
        'TypeScript 类型在编译时检查，运行时擦除',
        'let 可重新赋值，const 不可',
        '支持联合类型、泛型等高级类型特性'
      ]
    }
  ],
  comparisonTips: 'Java/Go/TypeScript 需声明类型（Go/TS 可推断），Python 完全动态；注意布尔值大小写差异（Python 首字母大写）',
  relatedTopics: ['variables', 'type-conversion', 'operators']
};