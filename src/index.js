import { readFileSync } from 'node:fs';
import path from 'node:path';
import parserPath from './parser.js';
import buildTree from './builder.js';
import choser from './formatter/index.js';

const formatDiff = (path1, path2, formatter) => {
  const getData = (filepath) => parserPath(path1)(readFileSync(filepath, 'utf-8'));
  const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);

  const file1 = getData(buildFullPath(path1));
  const file2 = getData(buildFullPath(path2));
  const diffTree = buildTree(file1, file2);
  const result = choser(diffTree, formatter);
  return result;
};

export default formatDiff;
