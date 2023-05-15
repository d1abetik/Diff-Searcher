import { readFileSync } from 'node:fs';
import difference from '../src/index.js';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { compare, stringifyObj } from '../src/difference.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const result = readFile('testResult.txt');

test('differenceSteps', () => {
  const obj1 = readFile('file1Test.json');
  const obj2 = readFile('file2Test.json');
  expect(compare(obj1, obj2)).toEqual({ '- follow': false, host: 'hexlet.io', '- proxy': '123.234.53.22', timeout: [ 50, 20 ] });

});

test('diffStep', () => {
  const obj3 = compare(readFile('file1Test.json'), readFile('file2Test.json'));
  expect(stringifyObj(obj3)).toEqual(result);

})

test('gendiff', () => {
  const filepath3 = getFixturePath('file1.json');
  const filepath4 = getFixturePath('file2.json');
  expect(difference(filepath3, filepath4)).toEqual(result);

});
