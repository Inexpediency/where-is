#!/usr/bin/env node  
    // indicates that processing should be carried out NodeJS

// npm link --force - add to cmd
// where-is - run
  
const commander = require('commander'),
{ prompt } = require('inquirer'),
chalk = require('chalk'),
fs = require('fs')

const childProcess = require('child_process');

commander.version('1.0.0').description('Files finder from current path.')  // Util name and description
// where-is --version
// where-is --help

let get_files = (start_path, fname) => {
    let results = []
    let file_list = fs.readdirSync(start_path)
    file_list.forEach((file) => {
        file_path = start_path + "\\" + file 
        let file_stat = fs.statSync(file_path) 
        if (file_stat && file_stat.isDirectory()) {
            // Find in this dir
            results = results.concat(get_files(file_path, fname))
        } else {
            file_name = file_path.toString().split('\\').pop()
            entries = file_name.split(fname).length - 1 // Number of entries
            if (entries > 0) {
                results.push(file_path)
            }
        }
    })
    return results
}

commander
  .command('find <fname>')  // command name with props name 
  .description('Search for a file from the current path.')
  .alias('f')  // short name of command
  .option('--help', 'finc')
  .action((fname, cmd) => {  // some action
        var path = childProcess.execSync('echo %CD%').toString();  // Take current path
        path = path.replace(/[\n, \r]/g, '')  // Remove other signs
        fname = fname.toString().replace(/[\n, \r]/g, '')
        console.log(`Results from path: ${path}`)
        files = get_files(path, fname)
        if (files.length > 0) {
            console.log(chalk.bgCyan(`Found ${files.length} element(s).`))
            for (file in files) {
                console.log(chalk.green(`${files[file]}`))
            }
        } else {
            console.log(chalk.redBright('Nothing'))
        }
  })

commander.parse(process.argv)  // Take Array of string for parsing
