
# Student

| 属性 | 类型 | 必填 | 描述 |
| ---- | ----| ----| ----|
| name | string | 是 | 姓名 |
| sex | `male`\|`female` | 是 | 性别1 |
| chineseScore | number | 否 | 语文成绩 |
| mathScore | number | 否 | 数学成绩 |
| getScore | (chineseScore: number, mathScore: number) => number | 是 | 获取总成绩 |

# Teacher

| 属性 | 类型 | 必填 | 描述 |
| ---- | ----| ----| ----|
| name | string | 是 | 姓名 |
| sex | `male`\|`female` | 是 | 性别 |
| type | `chinese`\|`math` | 是 | 教导科目 |
