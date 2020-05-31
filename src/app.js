#!/usr/bin/env node

/* -*- coding: utf-8 -*- */

    /* author: Ythosa */
    // cli label: Where-Is?
    // cli command: wis

// npm link --force   -   add module to cmd

const configCLI = require('./configs/configCLI')

const Run = () => {
    let commander = require('commander')

    commander = configCLI(commander) // Config CLI commands
    commander.program.exitOverride()

    try {
        commander.parse(process.argv)  // Take array of string for parsing
    } catch {
        // Find similar functions
        const cmd = process.argv[2]

        if (cmd && cmd !== '-V' && cmd !== '--version' && cmd !== '-h' && cmd !== '--help')
            commander._unknownCommand(cmd)
    }
}

Run()  // Run CLI application
