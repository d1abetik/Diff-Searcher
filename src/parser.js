import yaml from 'js-yaml';
import path from 'node:path';

const parserPath = (name) => {
  const indexName = path.extname(name);
  switch (indexName) {
    case '.json':
      return JSON.parse;
    case '.yml':
      return yaml.load;
    case '.yaml':
      return yaml.load;
    default:
      throw new Error(`unknown file extension ${indexName}`);
  }
};
export default parserPath;
