#!/usr/bin/env node  
    // indicates that processing should be carried out NodeJS

/* -*- coding: utf-8 -*- */

    /* author: Ythosa */
    // cli label: Where-Is?
    // cli command: wis

// npm link --force   -   add module to cmd
  
const commander = require('commander')
const FileFinder = require('./libs/findfile')
const Printer = require('./libs/printer')

const tokens = require('./libs/tokens')

commander.version('1.1.0').description('Files finder from current path.')  // Util name and description
// wis --version|-V
// wis --help|-h

let filefinder = new FileFinder()
let printer = new Printer(tokens.colors)

// wis find|f [options:--strict|-S] <fname> 
commander
    .command('find <fname>')  // Command name with props name 
    .description('Search for a file from the current path.')
    .option('-S,--strict', 'Strict finding files.')
    .alias('f')  // Short name of command
    .action((fname, cmd) => { // Action

        if (tokens.valid_file_name.test(fname)) {
            console.log('yep')
            
            let strict_mode = false
            if (cmd.strict)
                strict_mode = true

            filefinder.get_similar_files(fname, strict_mode)
        } else {
            printer.print_error('Invalid file name')
        }

    })

// wis take|t <id>
commander
    .command('take <id>')
    .description('Go to file path with this id.')
    .alias('t')
    .action((id) => {
        filefinder.goto_path(id)
    })

commander.parse(process.argv)  // Take array of string for parsing
