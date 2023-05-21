import yaml from 'js-yaml';
import path from 'node:path';

const parserPath = (data, name) => {
  const indexName = path.extname(name);
  if (indexName === '' || indexName === undefined) {
    return '';
  }
  switch (indexName) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`unknown file extension ${indexName}`);
  }
};
export default parserPath;
