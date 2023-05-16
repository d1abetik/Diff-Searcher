import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => yaml.load(readFileSync(getFixturePath(fileName), 'utf-8'));

const parserPath = (name) => {
  const indexName = path.extname(name);
  if (indexName === '' || indexName === undefined) {
    return '';
  }
  let result = 0;
  switch (indexName) {
    case '.json':
      result = JSON.parse(readFileSync(path.resolve(getFixturePath(name))));
      break;
    case '.yml':
      result = readFile(name);
      break;
    case '.yaml':
      result = readFile(name);
      break;
    default:
      result = readFile(name);
      break;
  }
  return result;
};

export default parserPath;
