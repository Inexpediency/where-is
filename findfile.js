const childProcess = require('child_process')
const chalk = require('chalk')
const fs = require('fs')

class FileFinder {
        
    constructor() {
        /* Variable declaration */
        this.max_file_list_length = 30  // Max length of finded file list
        this.arr_of_colors = ['cyan', 'magenta', 'yellow']  // Colors supported chalk module
        this.data_list = {  // Data format
            file_list_has_updated : false,
            file_list: null
        }
        this.need_regex = false  // Need find with regexp
        this.regex = null  // RegExp to finding files
        this.strict_finding_mode = false  // Finding without strict mode
    }

    get_data() {
        /* Get data from json file */
        let data = fs.readFileSync(`${__dirname}\\data.json`, "utf8")
        data = JSON.parse(data)
        return data
    }

    set_data(data) {
        /* Save data in json file */
        data = JSON.stringify(data)
        fs.writeFileSync(`${__dirname}\\data.json`, data, "utf8")
    }

    get_files(start_path, fname) {
        /* Get files in this dir */
        this.need_regex = false
        if (fname.split('*').length > 1) {
            this.need_regex = true
        }
        let results = []
        let file_list = []

        // Method fs.readdirSync() can't rean private/close/system folders
        try {
            file_list = fs.readdirSync(start_path)
        }
        catch(err) {
            file_list = null
        }

        // Recursive walk in dirs
        if (file_list != null)
            file_list.forEach((file) => {
                let file_path = start_path + "\\" + file 
                let file_stat = fs.statSync(file_path) 
                if (file_stat && file_stat.isDirectory()) {
                    // Find in this dir
                    results = results.concat(this.get_files(file_path, fname))
                } else {
                    if (!this.need_regex) {
                        let entries = 0
                        if (this.strict_finding_mode) {
                            let file_name = file_path.toString().split('\\').pop()
                            entries = file_name.split(fname).length - 1 // Number of entries
                        } else {
                            let file_name = file_path.toString().split('\\').pop().toLowerCase()
                            entries = file_name.split(fname.toLowerCase()).length - 1 // Number of entries
                        }
                        if (entries > 0) {
                            results.push(file_path)
                        }
                    } else {
                        let valid_re_str
                        let file_name
                        if (this.strict_finding_mode) {
                            file_name = file_path.split('\\').pop()
                            valid_re_str = fname.split('*')[0] + '[a-zA-Z0-9_]*'
                            if (fname.split('*').length > 1) 
                                valid_re_str += fname.split('*')[1]
                        } else {
                            file_name = file_path.toString().split('\\').pop()
                            valid_re_str = fname.split('*')[0].toLowerCase() + '[a-zA-Z0-9_]*' + fname.split('*')[1].toLowerCase()
                        }
                        let re = new RegExp(valid_re_str)
                        this.regex = re
                        if (re.test(file_path)) {
                            results.push(file_path)
                        }
                    }
                        
                }
            })
        return results  // Array of file's paths
    }

    capitalizeFirstLetter(string) {
        /* Capitalizing string */
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    print_blank_line() {
        /* Output blank line */
        console.log(chalk.white('_____________________________'))
    }

    path_division(fname, path, fpos, current_color) {
        /* Output file paths in correct format */

        // bgColor from Color
        let bgColor = 'bg' + this.capitalizeFirstLetter(this.arr_of_colors[Number(current_color)])
        let bgColorBright = bgColor + 'Bright'

        // Index of path to file in array
        let f_index_pos = String(Number(fpos) + 1)
        if (f_index_pos.length == 1) 
            f_index_pos = '0' + f_index_pos

        process.stdout.write(chalk[bgColorBright](chalk.black(f_index_pos + '.'))+' ')
            let path_file = path.split('\\').pop()
            let path_folders = path.split('\\').slice(0, path.split('\\').length - 1)
            path_folders.forEach((folder) => {  // Output path to file dir
                process.stdout.write(chalk[this.arr_of_colors[current_color]](folder + '\\'))
            })

            let re = null
            if (!this.need_regex)
                re = RegExp(fname)
            else 
                re = this.regex

            // Calc similarity and path to file without path to file dir
            let similarity = null
            let path_wo_sim = null
            if (this.strict_finding_mode) {
                similarity = re.exec(path_file)[0]
                path_wo_sim = path_file.split(similarity)
            } else {
                similarity = re.exec(path_file.toLowerCase())[0]
                path_wo_sim = path_file.toLowerCase().split(similarity.toLowerCase())
            }

            process.stdout.write(chalk[this.arr_of_colors[current_color]](path_wo_sim[0]))
            process.stdout.write(chalk[bgColorBright](chalk.black(similarity)))
            if (path_wo_sim.length > 1)
                process.stdout.write(chalk[this.arr_of_colors[current_color]](path_wo_sim[1]))             
        console.log()
    }

    find(fname, strict_finding_mode) { 
        /* Find all currect files */

        if (strict_finding_mode) this.strict_finding_mode = true

        let path = childProcess.execSync('echo %CD%').toString();  // Take current path
        path = path.replace(/[\n, \r]/g, '')  // Remove other signs
        fname = fname.toString().replace(/[\n, \r]/g, '')

        // Priniting results
        this.print_blank_line()
        console.log(chalk.greenBright(`\nResults from path:`, chalk.inverse(` ${path} `)))
        let files = this.get_files(path, fname)

        if (files.length > this.max_file_list_length) {
            // Throw error. Too many files
            console.log(chalk.redBright('\nTry to specify the file name more precisely.\nToo many files found.',
            chalk.inverse(` ${files.length} `)))

            this.print_blank_line()

            // Update data list
            this.data_list.file_list = null  
            this.data_list.file_list_has_updated = false

        } else if (files.length > 0) {
            files = files.sort()

            // Update data list
            this.data_list.file_list_has_updated = true
            this.data_list.file_list = files

            if (files.length > 1) {
                console.log(chalk.greenBright(`Found`,
                chalk.inverse(` ${files.length} `)),
                chalk.greenBright('elements.'))
            } else {
                console.log(chalk.greenBright(`Found`,
                chalk.inverse(` ${files.length} `)),
                chalk.greenBright('element.'))
            }

            this.print_blank_line()
            console.log('')

            // Output paths in correct format 
            let current_color = Math.floor(Math.random() * (this.arr_of_colors.length))
            for (let file in files) {
                let path = files[file]
                this.path_division(fname, path, file, current_color)  // Console.log path with matching
                current_color++
                if (current_color >= this.arr_of_colors.length) current_color = 0
            }

            this.print_blank_line()

        } else {
            console.log(chalk.redBright('\nNo files were found with similar name.'))
            this.data_list.file_list = null
            this.data_list.file_list_has_updated = false

            this.print_blank_line()
        }
        this.set_data(this.data_list)  // Update data file
        console.log()
    }

    goto_path(id) {
        /* Opening file from data file list with id */
        this.data_list = this.get_data()

        this.print_blank_line()

        if (this.data_list.file_list != null) {
            if (id <= this.data_list.file_list.length) {
                // Take file path
                let path = this.data_list.file_list[id-1]
                // Output file path
                if (this.data_list.file_list_has_updated)
                {
                    console.log('\n' + chalk.greenBright(path))
                } else {
                    // Return Warning
                    console.log(chalk.yellowBright('\nWarning! You should update file list, by finding some file.\n'))
                    console.log(chalk.greenBright(path))
                } 
                // Open this file
                childProcess.execSync(`start ${path}`)  
            } else {
                // Return Error
                console.log(chalk.redBright('\nError! There is no such index.'))
            }
        } else {
            // Return Error
            console.log(chalk.redBright('\nError! File list is empty.'))
        }
        this.data_list.file_list_has_updated = false
        this.set_data(this.data_list)  // Update data file

        this.print_blank_line()
        console.log()
    }
}


module.exports = FileFinder  // export files finder class
