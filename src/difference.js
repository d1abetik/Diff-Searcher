import _ from 'lodash';

const compare = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const res = keys.reduce((acc, item) => {
    if (_.has(obj1, item) && _.has(obj2, item)) {
      if (obj1[item] === obj2[item]) return { ...acc, [item]: obj1[item] };
      return { ...acc, [item]: [obj1[item], obj2[item]] };
    }
    if (_.has(obj1, item)) return { ...acc, [`- ${item}`]: obj1[item] };
    return { ...acc, [`+ ${item}`]: obj2[item] };
  }, {});
  return res;
};

const stringifyObj = (obj) => {
  const data = Object.keys(obj);
  const res = data.reduce((acc, item) => {
    if (Array.isArray(obj[item])) {
      return `${acc}\n  - ${item}: ${obj[item][0]}\n  + ${item}: ${obj[item][1]}`;
    }
    return `${acc}\n  ${item}: ${obj[item]}`;
  }, '');
  return `{  ${res}\n}\n`;
};

export {
  compare,
  stringifyObj,
};
