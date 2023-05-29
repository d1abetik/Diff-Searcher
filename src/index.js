import { readFileSync } from 'node:fs';
import path from 'node:path';
import parserPath from './parser.js';
import buildTree from './builder.js';
import formatDiff from './formatter/index.js';

const getExtension = (filePath) => path.extname(filePath).slice(1);
const getData = (filepath, path1) => parserPath(readFileSync(filepath, 'utf-8'), getExtension(path1));
const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const resultDiff = (path1, path2, formatter) => {
  const file1 = getData(buildFullPath(path1), path1);
  const file2 = getData(buildFullPath(path2), path2);
  const diffTree = buildTree(file1, file2);
  const result = formatDiff(diffTree, formatter);
  return result;
};

export default resultDiff;
