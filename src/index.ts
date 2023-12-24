interface Student {
  /** 姓名 */
  name: string;

  /** 性别1 */
  sex: 'male' | 'female';

  /** 语文成绩 */
  chineseScore?: number;

  /** 数学成绩 */
  mathScore?: number;

  /** 获取总成绩 */
  getScore: (chineseScore: number, mathScore: number) => number;
}

interface Teacher {
  /** 姓名 */
  name: string;

  /** 性别 */
  sex: 'male' | 'female';

  /** 教导科目 */
  type: 'chinese' | 'math';
}

const ming: Student = {
  name: 'ming',
  sex: 'male',
  chineseScore: 88,
  mathScore: 96,
  getScore(chineseScore, mathScore) {
    return chineseScore + mathScore;
  },
};
