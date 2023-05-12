#!/usr/bin/env node
const { Command } = require('../node_modules/commander');
const program = new Command();

program
      .description('Compares two configuration files and shows a difference.')
      .option('-V, --version        output the version number')
      .option('-h, --help           display help for command')

program.command('-h')

program.parse();