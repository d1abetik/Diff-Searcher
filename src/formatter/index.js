import plain from './plain.js';
import iter from './stylish.js';
import json from './json.js';

const formatDiff = (obj, formatter) => {
  switch (formatter) {
    case 'plain':
      return plain(obj);
    case 'json':
      return json(obj);
    default:
      return iter(obj);
  }
};

export default formatDiff;
