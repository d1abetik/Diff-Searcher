// @ts-check
import { test } from 'node:test';
import { expect } from 'expect';
import { compare, stringifyObj, difference } from '../bin/difference.js';

test('difference', () => {
  const obj1 = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false 
  };
  const obj2 = {
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io" 
  };
  expect(compare(obj1, obj2)).toEqual({ '- follow': false, 
  host: 'hexlet.io', 
  '- proxy': '123.234.53.22', 
  timeout: [50, 20], 
  '+ verbose': true });

  const obj3 = { '- follow': false, 
  host: 'hexlet.io', 
  '- proxy': '123.234.53.22', 
  timeout: [50, 20], 
  '+ verbose': true };
  expect(stringifyObj(obj3)).toEqual('{ - follow: false host: hexlet.io - proxy: 123.234.53.22- timeout: 50+ timeout: 20 + verbose: true }');

  const filepath1 = '__dirname/../src/file1.json';
  const filepath2 = '__dirname/../src/file2.json';
  expect(difference(filepath1, filepath2)).toEqual('{ - follow: false host: hexlet.io - proxy: 123.234.53.22 - timeout: 50+ timeout: 20 + verbose: true }');
});
