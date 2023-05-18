import { readFileSync } from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import objDiff from '../src/index.js';

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
