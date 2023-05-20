import { readFileSync } from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import objDiff from '../src/index.js';
import iter from '../src/formatter/stylish.js';
import buildTree from '../src/builder.js';
import parserPath from '../src/parser.js';
import plain from '../src/formatter/plain.js';
import json from '../src/formatter/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const result = readFile('testResult.txt');

test('objDiff', () => {
  const filepath1 = 'file1.json';
  const filepath2 = 'file2.json';
  expect(objDiff(filepath1, filepath2)).toEqual(result);

  expect(objDiff('{}', '{}')).toEqual('{\n\n}\n');
});

test('stylish for diffs', () => {
  const filepath1 = 'file1.json';
  const filepath2 = 'file2.json';
  const path1 = parserPath(filepath1);
  const path2 = parserPath(filepath2);
  const obj3 = buildTree(path1, path2);

  expect(iter(obj3)).toEqual(result);
});

test('plain for diffs', () => {
  const filepath1 = 'file1.json';
  const filepath2 = 'file2.json';
  const path1 = parserPath(filepath1);
  const path2 = parserPath(filepath2);
  const obj3 = buildTree(path1, path2);
  const res = readFile('testPlain.txt');

  expect(`${plain(obj3)}\n`).toEqual(res);
});

test('json formatter fir diffs', () => {
  const filepath1 = 'file1.json';
  const filepath2 = 'file2.json';
  const path1 = parserPath(filepath1);
  const path2 = parserPath(filepath2);
  const obj3 = buildTree(path1, path2);
  expect(json(obj3)).toEqual(JSON.stringify(obj3, null, 2));

  expect(json({})).toEqual(JSON.stringify({}, null, 2));
});
