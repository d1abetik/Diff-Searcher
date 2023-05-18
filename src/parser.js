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
  switch (indexName) {
    case '.json':
      return JSON.parse(readFileSync(path.resolve(getFixturePath(name))));
    case '.yml':
      return readFile(name);
    case '.yaml':
      return readFile(name);
    default:
      return readFile(name);
  }
};

export default parserPath;
