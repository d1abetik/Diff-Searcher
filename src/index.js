import * as fs from 'fs';
import * as path from 'path';
import { stringifyObj, compare } from './difference.js';
import parserPath from './parser.js';

const difference = (filepath1, filepath2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
  const obj3 = compare(obj1, obj2);
  const result = stringifyObj(obj3);
  return result;
};

const objDiff = (path1, path2) => {
  const obj1 = parserPath(path1);
  const obj2 = parserPath(path2);
  const obj3 = compare(obj1, obj2);
  const result = stringifyObj(obj3);
  console.log(result);
  return result;
};

export {
  difference,
  objDiff,
};
