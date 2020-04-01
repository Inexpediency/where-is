#!/usr/bin/env node  
    // indicates that processing should be carried out NodeJS

// npm link --force - add to cmd
// where-is - run
  
let commander = require('commander'),
// { prompt } = require('inquirer'),
FileFinder = require('./findfile')

commander.version('1.0.0').description('Files finder from current path.')  // Util name and description
// where-is --version
// where-is --help

let filefinder = new FileFinder()

commander
    .command('find <fname>')  // Command name with props name 
    .description('Search for a file from the current path.')
    .option('-S,--strict', 'Strict finding')
    .alias('f')  // Short name of command
    .action((fname, cmd) => { // Action
            let strict_finding_mode = false
            if (cmd.strict) {
                strict_finding_mode = true
                filefinder.find(fname, strict_finding_mode)
            } else {
                filefinder.find(fname.toLowerCase(), strict_finding_mode)
            }
    })

commander
    .command('take <id>')
    .description('Go to file path with this id')
    .alias('t')
    .action((id, cmd) => {
        filefinder.goto_path(id)
    })

commander.parse(process.argv)  // Take Array of string for parsing
