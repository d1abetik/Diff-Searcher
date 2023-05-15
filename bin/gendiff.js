#!/usr/bin/env node
import { Command } from 'commander';
import difference from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .version('-V, --version        output the version number')
  .arguments('<filepath1>', 'type path to your first file')
  .arguments('<filepath2>', 'type path to your second file')
  .action((path1, path2) => {
    difference(path1, path2);
  });
program.parse(process.argv);
