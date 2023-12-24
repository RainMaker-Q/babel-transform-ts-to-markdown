const babel = require('@babel/core');
const parser = require('@babel/parser');
const t = require('@babel/types');
const { getTsType } = require('./utils');

const fs = require('fs');

const code = fs.readFileSync('index.ts', 'utf-8');

const ast = parser.parse(code, {
  sourceType: 'unambiguous',
  plugins: ['typescript'],
});

const res = [];

babel.traverse(ast, {
  TSInterfaceDeclaration(path) {
    if (t.isTSInterfaceBody(path.node.body)) {
      const body = path.node.body;
      const iName = path.node.id.name;

      const itemBody = { [iName]: [] };

      body.body.forEach((item) => {
        if (t.isTSPropertySignature(item)) {
          const name = item?.key?.name;
          const optional = !!item?.optional;
          const leadingComments = item.leadingComments[0]?.value
            .replace('*', '')
            .trim();
          const originType = item.typeAnnotation.typeAnnotation;
          let type = getTsType(originType);

          //  typeAnnotation
          itemBody[iName].push({
            type,
            name,
            optional,
            desc: leadingComments,
          });
        }
      });

      res.push(itemBody);
    }
  },
});

const genMdTxt = (arr) => {
  let str = '';

  const TitleTemplate = `
# iName
`;
  const HeaderTemplate = `
| 属性 | 类型 | 必填 | 描述 |
| ---- | ----| ----| ----|
`;

  const genContentTemplate = ({ name, type, optional, desc }) =>
    `| ${name} | ${type} | ${optional ? '否' : '是'} | ${desc} |
`;

  arr.forEach((item) => {
    const key = Object.keys(item)[0];
    str += TitleTemplate.replace('iName', key) + HeaderTemplate;
    item[key].forEach((interfaceItem) => {
      str += genContentTemplate(interfaceItem);
    });
  });

  return str;
};

const mdRes = genMdTxt(res);

fs.writeFileSync('result.md', mdRes);
console.log('---mdRes is ', mdRes);
