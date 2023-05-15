import { compare, stringifyObj, difference } from '../bin/difference.js';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const result = '{ \n\t- follow: false\n\thost: hexlet.io\n\t- proxy: 123.234.53.22\n\t- timeout: 50\n\t+ timeout: 20\n\t+ verbose: true \n}';

test('differenceSteps', () => {
  const obj1 = readFile('file1Test.json');
  const obj2 = readFile('file2Test.json');
  expect(compare(obj1, obj2)).toEqual({ '- follow': false, host: 'hexlet.io', '- proxy': '123.234.53.22', timeout: [50, 20], '+ verbose': true });

  const obj3 = compare(obj1, obj2);
  expect(stringifyObj(obj3)).toEqual(result);

});

test('gendiff', () => {
  const filepath3 = getFixturePath('file1Test.json');
  const filepath4 = getFixturePath('file2Test.json');
  expect(difference(filepath3, filepath4)).toEqual(result);
});