<h1 align="center">Where-Is?</h1>
<div align="center">
  
---

[![Badge](https://img.shields.io/badge/Uses-Node.js-green.svg?style=flat-square)](1)
[![Badge](https://img.shields.io/badge/Open-Source-important.svg?style=flat-square)](1)
[![Badge](https://img.shields.io/badge/Made_with-Love-ff69b4.svg?style=flat-square)](1)
    
---

</div>

# Install
-   Install [Node.js](https://nodejs.org/en/) 
-   Clone this repo: `git clone https://github.com/Ythosa/where-is`
-   Install dependences by writing in console: `npm install`
-   Setup module by writing in console: `npm link --force`
-   Done, you can use it from your `cmd`

---

# Description
-    Command line interface to finding files
-    **Important** - `where-is` can't find files in close/private/system folders

---

# Docs

---

###   CLI Commands:
   -   Get `where-is` help.
       *  `wis --help|-h`
   -   Get `where-is` version.
       *  `wis --version|-V`
   -   Search for files from the current path.
       *  `wis find|f <file_name> [--strict|-S]`
       *  `--strict|-S` flag carries out a strict search (full compliance found file name and `<file_name>`)
   -   Open file with `<id>` from found file list.
       *  `wis take|t <id>`

---

###   Using Examples:
   -  Finding Files Example: <br> <br>
    <img src="https://github.com/Ythosa/where-is/blob/master/docs/pres_main.png" alt="Finding files example">
    
    
   -  Using Strict Mode Example: <br> <br>
    <img src="https://github.com/Ythosa/where-is/blob/master/docs/pres_strict_mode.png" alt="Finding files example">
    
   
   -  File Open Example (file have opened in VS, becouse VS set as default): <br> <br>
    <img src="https://github.com/Ythosa/where-is/blob/master/docs/pres_take.png" alt="Finding files example">
