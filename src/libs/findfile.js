const childProcess = require('child_process')
const chalk = require('chalk')
const fs = require('fs')

class FileFinder {

    get_files(start_path, fname) {
        /* Get files in this dir */

    //     this.need_regex = fname.split('*').length > 1;
    //     let results = []
    //     let file_list = []
    //
    //     // Method fs.readdirSync() can't rean private/close/system folders
    //     try {
    //         file_list = fs.readdirSync(start_path)
    //     } catch(err) {
    //         file_list = null
    //     }
    //
    //     // Recursive walk in dirs
    //     if (file_list != null)
    //         file_list.forEach((file) => {
    //             let file_path = start_path + "\\" + file
    //             let file_stat = fs.statSync(file_path)
    //             if (file_stat && file_stat.isDirectory()) {
    //                 // Find in this dir
    //                 results = results.concat(this.get_files(file_path, fname))
    //             } else {
    //                 if (!this.need_regex) {
    //                     let entries = 0
    //                     if (this.strict_finding_mode) {
    //                         let file_name = file_path.toString().split('\\').pop()
    //                         entries = file_name.split(fname).length - 1 // Number of entries
    //                     } else {
    //                         let file_name = file_path.toString().split('\\').pop().toLowerCase()
    //                         entries = file_name.split(fname.toLowerCase()).length - 1 // Number of entries
    //                     }
    //                     if (entries > 0) {
    //                         results.push(file_path)
    //                     }
    //                 } else {
    //                     let valid_re_str
    //                     if (this.strict_finding_mode) {
    //                         valid_re_str = fname.split('*')[0] + this.validstr
    //                         if (fname.split('*').length > 1)
    //                             valid_re_str += fname.split('*')[1]
    //                     } else {
    //                         valid_re_str = fname.split('*')[0].toLowerCase() + this.validstr + fname.split('*')[1].toLowerCase()
    //                     }
    //                     let re = new RegExp(valid_re_str)
    //                     this.regex = re
    //                     if (re.test(file_path)) {
    //                         results.push(file_path)
    //                     }
    //                 }
    //
    //             }
    //         })
    //     return results  // Array of file's paths
    }

    capitalizeFirstLetter(string) {
        /* Capitalizing string */
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    find(fname, strict_finding_mode) { 
        /* Find all currect files */

        if (strict_finding_mode) this.strict_finding_mode = true

        let path = childProcess.execSync('echo %CD%').toString();  // Take current path
        path = path.slice(0, -2)  // Remove other signs
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
                if (! /[\r| ]/g.exec(path)) 
                    childProcess.execSync(`start ${path}`)  
                else 
                    console.log(chalk.redBright('\nCan\'t open files which path has space.'))
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


module.exports = FileFinder 
