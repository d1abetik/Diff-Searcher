import plain from './plain.js';
import iter from './stylish.js';

const choser = (obj, formatter) => {
  switch (formatter) {
    case 'plain':
      return plain(obj);
    default:
      return iter(obj);
  }
};

export default choser;
