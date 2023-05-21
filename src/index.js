import { readFileSync } from 'node:fs';
import path from 'node:path';
import parserPath from './parser.js';
import buildTree from './builder.js';
import choser from './formatter/index.js';

const objDiff = (path1, path2, formatter) => {
  const getData = (filepath) => parserPath(readFileSync(filepath, 'utf-8'), path1);
  const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);

  const obj1 = getData(buildFullPath(path1));
  const obj2 = getData(buildFullPath(path2));
  const obj3 = buildTree(obj1, obj2);
  const result = choser(obj3, formatter);
  return result;
};

export default objDiff;
