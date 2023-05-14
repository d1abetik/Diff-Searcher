import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';

const compare = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const res = keys.reduce((acc, item) => {
    if (_.has(obj1, item) && _.has(obj2, item)) {
      if (obj1[item] === obj2[item]) return { ...acc, [item]: obj1[item] };
      return { ...acc, [item]: [obj1[item], obj2[item]] };
    } else if (_.has(obj1, item)) return { ...acc, [`- ${item}`]: obj1[item] };
    return { ...acc, [`+ ${item}`]: obj2[item] };
  }, {});
  console.log(res);
  return res;
};

const stringifyObj = (obj) => {
  const data = Object.keys(obj);
  const res = data.reduce((acc, item) => {
    if (Array.isArray(obj[item])) {
      return `${acc}
    - ${item}: ${obj[item][0]}
    + ${item}: ${obj[item][1]}`;
    }
    return `${acc} 
    ${item}: ${obj[item]}`;
  }, '');
  return `{ ${res} 
}`;
};

const difference = (filepath1, filepath2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
  const obj3 = compare(obj1, obj2);
  const result = stringifyObj(obj3);
  console.log(result);
};

export { difference,
  compare,
  stringifyObj,
};
