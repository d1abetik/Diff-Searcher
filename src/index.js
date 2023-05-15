import * as fs from 'fs';
import * as path from 'path';
import { stringifyObj, compare } from './difference.js';

const difference = (filepath1, filepath2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
  const obj3 = compare(obj1, obj2);
  const result = stringifyObj(obj3);
  return result;
};

export default difference;
