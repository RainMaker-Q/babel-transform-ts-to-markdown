const t = require('@babel/types');

/**
 *
 * @param {*} originType
 * @description 处理函数类型的方法，输入函数类型ast，返回函数类型的必要结构
 * @returns {params: {name: string, type: string}[], result: string}
 */
const transformTsFunTypeToModel = (originType) => {
  const originParams = originType.parameters;
  const params = originParams.map((val) => {
    const name = val.name;
    const type = getTsType(val.typeAnnotation.typeAnnotation);
    return {
      name,
      type,
    };
  });
  const result = getTsType(originType.typeAnnotation.typeAnnotation);

  //TODO: function optional

  return {
    params,
    result,
  };
};

/**
 * @description 根据函数类型的结构，以字符串形式返回最终的类型
 * @returns string 如 (a: string, b: number) => number
 */
const genTsFunTypeWithModel = ({ params, result }) => {
  const p = params
    .map((val) => {
      return val.name + ': ' + val.type;
    })
    .join(', ');

  return `(${p}) => ${result}`;
};

const getTsType = (originType) => {
  let type = '';

  // 联合类型的处理
  if (t.isTSUnionType(originType)) {
    const types = originType.types;
    // 获取每一项枚举值
    const res = types.map((val) => {
      if (t.isTSLiteralType(val)) {
        return '`' + val.literal.value + '`';
      }
    });
    type = res.join('\\|');
  } else if (t.isTSStringKeyword(originType)) {
    type = 'string';
  } else if (t.isTSBooleanKeyword(originType)) {
    type = 'boolean';
  } else if (t.isTSNumberKeyword(originType)) {
    type = 'number';
  } else if (t.isTSFunctionType(originType)) {
    const params = transformTsFunTypeToModel(originType);
    const res = genTsFunTypeWithModel(params);
    type = res;
  }

  return type;
};

module.exports = {
  getTsType,
};
