import { readFileSync } from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import parserPath from './parser.js';
import buildTree from './builder.js';
import choser from './formatter/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => readFileSync(getFixturePath(fileName), 'utf-8');

const objDiff = (path1, path2, formatter) => {
  const obj1 = parserPath(readFile(path1), path1);
  const obj2 = parserPath(readFile(path2), path2);
  const obj3 = buildTree(obj1, obj2);
  const result = choser(obj3, formatter);
  return result;
};

export default objDiff;
