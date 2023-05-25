import { readFileSync } from 'node:fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import formatDiff from '../src/index.js';
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
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(formatDiff(filepath1, filepath2)).toEqual(readFile('testResult.txt'));
});

test('stylish for diffs', () => {
  const filepath1 = 'file1.json';
  const filepath2 = 'file2.json';
  const path1 = parserPath(filepath1)(readFile(filepath1));
  const path2 = parserPath(filepath2)(readFile(filepath2));
  const diffTree1 = buildTree(path1, path2);

  expect(iter(diffTree1)).toEqual(result);

  const diffTree2 = buildTree(path1, path1);
  const res1 = readFile('testSame1.txt');
  expect(iter(diffTree2)).toEqual(res1);
});

test('plain for diffs', () => {
  const filepath1 = 'file1.json';
  const filepath2 = 'file2.json';
  const path1 = parserPath(filepath1)(readFile(filepath1));
  const path2 = parserPath(filepath2)(readFile(filepath2));
  const diffTree1 = buildTree(path1, path2);
  const res = readFile('testPlain.txt');

  expect(plain(diffTree1)).toEqual(res);

  const diffTree2 = buildTree(path1, path1);
  expect(plain(diffTree2)).toEqual('\n\n');
});

test('json formatter for diffs', () => {
  const filepath1 = 'file1.json';
  const filepath2 = 'file2.json';
  const path1 = parserPath(filepath1)(readFile(filepath1));
  const path2 = parserPath(filepath2)(readFile(filepath2));
  const diffTree1 = buildTree(path1, path2);
  expect(json(diffTree1)).toEqual(`${JSON.stringify(diffTree1, null, 2)}`);

  expect(json({})).toEqual(`${JSON.stringify({}, null, 2)}`);

  const diffTree2 = buildTree(path1, path1);
  const res2 = readFile('testSame2.txt');
  expect(json(diffTree2)).toEqual(res2);
});
