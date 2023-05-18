import parserPath from './parser.js';
import buildTree from './builder.js';
import iter from './formatter/stylish.js';

const objDiff = (path1, path2) => {
  const obj1 = parserPath(path1);
  const obj2 = parserPath(path2);
  const obj3 = buildTree(obj1, obj2);
  const result = iter(obj3);
  return result;
};

export default objDiff;
