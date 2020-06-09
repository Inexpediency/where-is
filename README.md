<br>

<h1 align="center">Where-Is?</h1>
<div align="center">


[![Badge](https://img.shields.io/badge/Uses-Node.js-green.svg?style=flat-square)]("NodeJS")
[![Badge](https://img.shields.io/badge/Open-Source-important.svg?style=flat-square)]("OpenSource")
[![Badge](https://img.shields.io/badge/Made_with-Love-ff69b4.svg?style=flat-square)]("MadeWithLove")

<br>
</div>

> Latest version - v1.2.0; Stable version - v1.1.0.

## Install
-   Install [Node.js](https://nodejs.org/en/) 
-   Clone this repo: `git clone https://github.com/Ythosa/where-is`
-   Install dependencies by writing in the console: `npm install`
-   Setup module by writing in the console: `npm link --force`
-   Done, you can use it from your `cmd` :3


## Description
-    Command line interface to finding files
-    Important: `where-is` can't find files in close/private/system folders.


## Docs

###   CLI Commands:
   -   Main CLI Command:
       *   `wis`
   -   Get help:
       *  `wis --help|-h`
   -   Get version:
       *  `wis --version|-V`
   -   Search for files from the current path:
       *  `wis find|f <file_name> [--path|-p <start_path>] [--strict|-p] [--help|-h]`
       *  `--path|-p` flag allows you to start searching from a different folder and supports all possible paths;
       *  `--strict|-s` flag carries out a strict search (full compliance found file name and `<file_name>`).
   -   Get last found file list:
       *  `wis last|l [--help|-h]`
   -   Get programs from PATH:
       *  `wis programs|prs`
       *  Important: There may not be all programs found. 
       *  For example, there are no standard applications found such as: explorer, calc, code, etc...
   -   Open file with `<id>` from found file list:
       *  `wis goto|g <id> [--help|-h] [--withp|-w <program>] [--force]`
       *  `<id>` can be `last` - go to last taken file or index of path in file list found by `wis`
       *  `--withp|-w` flag to open file with a program placed in the PATH;
       *  `--force` flag to open file with disable the check of finding application in PATH.
   -   Get last taken file path:
       *  `wis lastgoto|lg [--help|-h]`

###   Using Examples:
   -  Finding Files Example: <br> <br>
    <img src="https://github.com/Ythosa/where-is/blob/master/assets/findCommandExample.png" alt="Finding files example">
    
    
   -  Using Strict Mode Example: <br> <br>
    <img src="https://github.com/Ythosa/where-is/blob/master/assets/strictModeExample.png" alt="Using strict mode example">
    
   
   -  File Open Example (file have opened in VS, because VS set as default): <br> <br>
    <img src="https://github.com/Ythosa/where-is/blob/master/assets/gotoAndLastCommandsExample.png" alt="Open file example">


## FAQ
*Q*: How can I get help on some command?  
*A*: You can use command flag `--help|-h`, for example: `wis goto --help`

*Q*: How can I help to develop this project?  
*A*: You can put a :star: :3


<div align="center">
  Copyright 2020 Ythosa
</div>