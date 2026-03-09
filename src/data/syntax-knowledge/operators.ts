// src/data/syntax-knowledge/operators.ts
import type { SyntaxTopic } from '../types';

export const operators: SyntaxTopic = {
  id: 'operators',
  title: '运算符',
  description: '编程语言中用于执行算术、逻辑、比较等操作的基本符号。',
  snippets: [
    {
      language: 'java',
      code: `// 算术运算符
int sum = 10 + 5;
int diff = 10 - 5;
int product = 10 * 5;
double quotient = 10.0 / 5;
int remainder = 10 % 3;  // 取模

// 自增自减
int i = 0;
i++;  // 后置自增
++i;  // 前置自增

// 比较运算符
boolean isEqual = (10 == 5);
boolean isGreater = (10 > 5);

// 逻辑运算符
boolean and = (true && false);
boolean or = (true || false);
boolean not = !true;`,
      notes: [
        'Java 中整数除法会取整（10/5=2, 10/3=3）',
        '== 比较值，equals() 比较对象内容',
        '逻辑运算符支持短路求值'
      ]
    },
    {
      language: 'python',
      code: `# 算术运算符
sum = 10 + 5
diff = 10 - 5
product = 10 * 5
quotient = 10 / 5      # 浮点除法 (2.0)
floor_div = 10 // 3    # 整除 (3)
remainder = 10 % 3     # 取模 (1)
power = 2 ** 3         # 幂运算 (8)

# 比较运算符
is_equal = (10 == 5)
is_greater = (10 > 5)

# 逻辑运算符 (英文单词)
and_op = True and False
or_op = True or False
not_op = not True

# 成员运算符
is_in = 1 in [1, 2, 3]  # True`,
      notes: [
        '/ 是浮点除法，// 是整除',
        '逻辑运算符用单词 and/or/not',
        '支持链式比较：1 < x < 10'
      ]
    },
    {
      language: 'go',
      code: `// 算术运算符
sum := 10 + 5
diff := 10 - 5
product := 10 * 5
quotient := 10 / 5    // 整数除法
remainder := 10 % 3

// 自增自减 (仅语句，不能用于表达式)
i := 0
i++  // ✅ 合法
// j := i++  // ❌ 非法

// 比较运算符
isEqual := (10 == 5)
isGreater := (10 > 5)

// 逻辑运算符
and := true && false
or := true || false
not := !true`,
      notes: [
        '++ 和 -- 只能是独立语句',
        '没有三元运算符 (a ? b : c)',
        '类型必须一致才能运算'
      ]
    },
    {
      language: 'typescript',
      code: `// 算术运算符
let sum = 10 + 5;
let quotient = 10 / 5;
let remainder = 10 % 3;
let power = 2 ** 3;  // ES2016 支持

// 自增自减
let i = 0;
i++;
++i;

// 比较运算符
let isEqual = (10 === 5);  // 推荐严格相等
let isLoose = (10 == "10"); // 不推荐

// 逻辑运算符
let and = true && false;
let or = true || false;
let not = !true;

// 空值合并运算符
let value = null ?? 'default';  // 'default'
let opt = 0 || 'default';       // 'default' (0 是 falsy)`,
      notes: [
        '推荐用 === 而非 ==',
        '支持 ?? 空值合并运算符',
        '支持可选链 ?. (obj?.prop)'
      ]
    }
  ],
  comparisonTips: 'Python 用单词表示逻辑运算，Go 的++只能独立使用，TS 推荐严格相等===，注意整数除法差异',
  relatedTopics: ['basic-types', 'if-else', 'variables']
};