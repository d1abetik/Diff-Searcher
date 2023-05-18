import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const filtered = keys.map((key) => {
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) return { key, type: 'nested', children: buildTree(obj1[key], obj2[key]) };
    if (!_.has(obj2, key)) return { key, type: 'deleted', children: obj1[key] };
    if (!_.has(obj1, key)) return { key, type: 'added', children: obj2[key] };
    if (obj1[key] !== obj2[key]) {
      return {
        key, type: 'changed', children1: obj1[key], children2: obj2[key],
      };
    }
    return { key, type: 'unchanged', children: obj1[key] };
  });
  return filtered;
};

export default buildTree;
