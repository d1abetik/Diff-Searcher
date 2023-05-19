import parserPath from './parser.js';
import buildTree from './builder.js';
import choser from './formatter/index.js';

const objDiff = (path1, path2, formatter) => {
  const obj1 = parserPath(path1);
  const obj2 = parserPath(path2);
  const obj3 = buildTree(obj1, obj2);
  const result = choser(obj3, formatter);
  return result;
};

export default objDiff;
