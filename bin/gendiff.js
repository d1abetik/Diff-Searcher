#!/usr/bin/env node
import { Command } from 'commander';
import objDiff from '../src/index.js';

const program = new Command();

program
  .version('0.0.1')
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>', 'type path to your first file')
  .argument('<filepath2>', 'type path to your second file')
  .action((path1, path2) => {
    console.log(objDiff(path1, path2, program.opts().format));
  });
program.parse(process.argv);
