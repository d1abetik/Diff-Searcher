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
});

test('stylish for diffs', () => {
  const filepath1 = 'file1.json';
  const filepath2 = 'file2.json';
  const path1 = parserPath(readFile(filepath1), filepath1);
  const path2 = parserPath(readFile(filepath2), filepath2);
  const obj3 = buildTree(path1, path2);

  expect(iter(obj3)).toEqual(result);

  const obj4 = buildTree(path1, path1);
  const res1 = readFile('testSame1.txt');
  expect(iter(obj4)).toEqual(res1);
});

test('plain for diffs', () => {
  const filepath1 = 'file1.json';
  const filepath2 = 'file2.json';
  const path1 = parserPath(readFile(filepath1), filepath1);
  const path2 = parserPath(readFile(filepath2), filepath2);
  const obj3 = buildTree(path1, path2);
  const res = readFile('testPlain.txt');

  expect(`${plain(obj3)}\n`).toEqual(res);

  const obj4 = buildTree(path1, path1);
  expect(plain(obj4)).toEqual('\n\n');
});

test('json formatter for diffs', () => {
  const filepath1 = 'file1.json';
  const filepath2 = 'file2.json';
  const path1 = parserPath(readFile(filepath1), filepath1);
  const path2 = parserPath(readFile(filepath2), filepath2);
  const obj3 = buildTree(path1, path2);
  expect(json(obj3)).toEqual(`${JSON.stringify(obj3, null, 2)}\n`);

  expect(json({})).toEqual(`${JSON.stringify({}, null, 2)}\n`);

  const obj4 = buildTree(path1, path1);
  const res2 = readFile('testSame2.txt');
  expect(json(obj4)).toEqual(res2);
});
