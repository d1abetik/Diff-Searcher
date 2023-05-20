import plain from './plain.js';
import iter from './stylish.js';
import json from './json.js';

const choser = (obj, formatter) => {
  switch (formatter) {
    case 'plain':
      return plain(obj);
    case 'json':
      return json(obj);
    default:
      return iter(obj);
  }
};

export default choser;
