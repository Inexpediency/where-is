#!/usr/bin/env node

/* -*- coding: utf-8 -*- */

    /* author: Ythosa */
    // cli label: Where-Is?
    // cli command: wis

// npm link --force   -   add module to cmd

const configCLI = require('./configs/configCLI')

const Run = () => {
    let commander = require('commander')

    // Config CLI commands
    commander = configCLI(commander)
    // Take array of string for parsing
    commander.parse(process.argv)
}

Run()  // Run CLI application
