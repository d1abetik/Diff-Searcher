import yaml from 'js-yaml';

const parserPath = { json: JSON.parse, yaml: yaml.load, yml: yaml.load };

export default (data, typeFile) => parserPath[typeFile](data);
