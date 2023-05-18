import _ from 'lodash';

const replacer = ' ';
const doubleSpace = '  ';
const spacesCount = 4;

const getIndent = (depth) => replacer.repeat(depth * spacesCount).slice(0, -2);

const stringifyObj = (obj, depth) => {
  if (!_.isPlainObject(obj)) {
    return `${obj}`;
  }
  const entries = Object.entries(obj);
  const lines = entries.map(([key, value]) => {
    return `${getIndent(depth + 1)}  ${key}: ${stringifyObj(value, (depth + 1))}`;
  });
  return `{\n${lines.join(`\n`)}\n${getIndent(depth)}${doubleSpace}}`;
};

const iter = (obj) => {
  const res = (node, depth) => node.flatMap(({ key, type, children, children1, children2 }) => {
    if (type === 'nested') {
      return `${getIndent(depth)}  ${key}: {\n${res(children, depth + 1).join('\n')}\n${getIndent(depth)}${doubleSpace}\n}`;
    }
    if (type === 'added') {
      return `${getIndent(depth)}+ ${key}: ${stringifyObj(children, depth)}`;
    }
    if (type === 'deleted') {
      return `${getIndent(depth)}- ${key}: ${stringifyObj(children, depth)}`;
    }
    if (type === 'changed') {
      return `${getIndent(depth)}- ${key}: ${stringifyObj(children1, depth)}\n${getIndent(depth)}+ ${key}: ${stringifyObj(children2, depth)}`;
    }
    if (type === 'unchanged') {
      return `${getIndent(depth)}  ${key}: ${stringifyObj(children, depth)}`;
    }
    return undefined;
  });
  return `{\n${res(obj, 1).join('\n')}\n}`;
};

export default iter;
