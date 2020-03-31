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

class FindFile {
    static save_chache(file_list) {
        /* Save last founded file_list */
        file_list = JSON.stringify(file_list)
        fs.writeFileSync(`${__dirname}\\data.json`, file_list, "utf8")
    }
    
    static get_cache() {
        /* Get last founded file_list */
        file_list = fs.readFileSync(`${__dirname}\\data.json`, "utf8")
        file_list = JSON.parse(file_list)
    }

    static get_files(start_path, fname) {
        /* Get files in this dir */
        let results = []
        let file_list = []
        try {
            file_list = fs.readdirSync(start_path)
        }
        catch(err) {
            file_list = null
        }
        if (file_list != null)
            file_list.forEach((file) => {
                let file_path = start_path + "\\" + file 
                let file_stat = fs.statSync(file_path) 
                if (file_stat && file_stat.isDirectory()) {
                    // Find in this dir
                    results = results.concat(FindFile.get_files(file_path, fname))
                } else {
                    let file_name = file_path.toString().split('\\').pop().toLowerCase()
                    let entries = file_name.split(fname.toLowerCase()).length - 1 // Number of entries
                    if (entries > 0) {
                        results.push(file_path)
                    }
                }
            })
        return results  // Array of file's paths
    }

    static find(fname) { 
        /* Find all currect files */
        // Colors supported chalk module

        const max_file_list_length = 30

        const arr_of_colors = ['cyan', 'magenta', 'yellow']

        let capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        let path = childProcess.execSync('echo %CD%').toString();  // Take current path
        path = path.replace(/[\n, \r]/g, '')  // Remove other signs
        fname = fname.toString().replace(/[\n, \r]/g, '')

        console.log(chalk.greenBright(`\nResults from path:`, chalk.inverse(` ${path} `)))
        let files = FindFile.get_files(path, fname)
        if (files.length > FindFile.max_file_list_length) {
            console.log(chalk.redBright('\nTry to specify the file name more precisely.\nToo many files found.',
            chalk.inverse(` ${files.length} `)))
        } else if (files.length > 0) {
            FindFile.save_chache(files)
            files = files.sort()
            if (files.length > 1) {
                console.log(chalk.greenBright(`Found`,
                chalk.inverse(` ${files.length} `)),
                chalk.greenBright('elements.\n'))
            } else {
                console.log(chalk.greenBright(`Found`,
                chalk.inverse(` ${files.length} `)),
                chalk.greenBright('element.\n'))
            }
            
            let path_division = (path, file, current_color) => {
                path = path.split('\\')

                // bgColor from Color
                let bgColor = 'bg' + capitalizeFirstLetter(arr_of_colors[Number(current_color)])
                let bgColorBright = bgColor + 'Bright'

                // Path index 0, 1, 2, 3
                let f_index_pos = String(Number(file) + 1)
                if (f_index_pos.length == 1) 
                    f_index_pos = '0' + f_index_pos

                process.stdout.write(chalk[bgColorBright](chalk.black(f_index_pos + '.'))+' ')
                for (let p in path) {
                    let f_path = path[p]
                    let pos = f_path.indexOf(fname)
                    if (pos != -1) {
                        process.stdout.write(chalk[arr_of_colors[current_color]](f_path.slice(0, pos)))
                        process.stdout.write(chalk[bgColorBright](chalk.black(f_path.slice(pos, pos + fname.length))))
                        process.stdout.write(chalk[arr_of_colors[current_color]](f_path.slice(pos + fname.length)+'\\'))
                    } else {
                        process.stdout.write(chalk[arr_of_colors[current_color]](f_path + '\\'))
                    }
                }
                console.log()
            }

            let current_color = Math.floor(Math.random() * (arr_of_colors.length))
            for (let file in files) {
                let path = files[file]
                path_division(path, file, current_color)  // Console.log path with matching
                current_color++
                if (current_color >= arr_of_colors.length) current_color = 0
            }
            console.log('\n')
        } else {
            console.log(chalk.redBright('\nNo files were found with similar name.'))
        }
    }
}

commander
    .command('find <fname>')  // Command name with props name 
    .description('Search for a file from the current path.')
    .option('--strict', 'Strict finding')
    .alias('f')  // Short name of command
    .action((fname, cmd) => { // Action 
            FindFile.find(fname)
    })

commander
    .command('take <num>')

commander.parse(process.argv)  // Take Array of string for parsing
