#!/usr/bin/env node
const { Command } = require('../node_modules/commander');
const program = new Command();

program
      .name('gendiff')
      
program.command('-h')
      .usage('gendiff [options]')
      .description('Compares two configuration files and shows a difference.')
      .option('-V, --version output the version number')
      .option('-h, --help display help for command')

program.parse();