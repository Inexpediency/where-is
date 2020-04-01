const childProcess = require('child_process');
const chalk = require('chalk')
const fs = require('fs')

class FileFinder {
        
    constructor() {
        this.max_file_list_length = 30
        this.data_list = []
        this.arr_of_colors = ['cyan', 'magenta', 'yellow']
        this.data_list = {
            file_list_has_updated : false,
            file_list: null
        }
    }

    get_data() {
        /* Get last founded file_list */
        let data = fs.readFileSync(`${__dirname}\\data.json`, "utf8")
        data = JSON.parse(data)
        return data
    }

    set_data(data) {
        /* Save last founded file_list */
        data = JSON.stringify(data)
        fs.writeFileSync(`${__dirname}\\data.json`, data, "utf8")
    }

    get_files(start_path, fname, strict_finding_mode) {
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
                    results = results.concat(this.get_files(file_path, fname, strict_finding_mode))
                } else {
                    let entries = 0
                    if (strict_finding_mode) {
                        let file_name = file_path.toString().split('\\').pop()
                        entries = file_name.split(fname).length - 1 // Number of entries
                    } else {
                        let file_name = file_path.toString().split('\\').pop().toLowerCase()
                        entries = file_name.split(fname.toLowerCase()).length - 1 // Number of entries
                    }
                    if (entries > 0) {
                        results.push(file_path)
                    }
                }
            })
        return results  // Array of file's paths
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    print_blank_line() {
        console.log(chalk.white('_____________________________'))
    }

    path_division(fname, path, fpos, current_color) {
        path = path.split('\\')

        // bgColor from Color
        let bgColor = 'bg' + this.capitalizeFirstLetter(this.arr_of_colors[Number(current_color)])
        let bgColorBright = bgColor + 'Bright'

        // Path index 0, 1, 2, 3
        let f_index_pos = String(Number(fpos) + 1)
        if (f_index_pos.length == 1) 
            f_index_pos = '0' + f_index_pos

        process.stdout.write(chalk[bgColorBright](chalk.black(f_index_pos + '.'))+' ')
        for (let p in path) {
            let f_path = path[p]
            let pos = f_path.indexOf(fname)
            if (pos != -1) {
                process.stdout.write(chalk[this.arr_of_colors[current_color]](f_path.slice(0, pos)))
                process.stdout.write(chalk[bgColorBright](chalk.black(f_path.slice(pos, pos + fname.length))))
                process.stdout.write(chalk[this.arr_of_colors[current_color]](f_path.slice(pos + fname.length)+'\\'))
            } else {
                process.stdout.write(chalk[this.arr_of_colors[current_color]](f_path + '\\'))
            }
        }
        console.log()
    }

    find(fname, strict_finding_mode) { 
        /* Find all currect files */
        // Colors supported chalk module

        let path = childProcess.execSync('echo %CD%').toString();  // Take current path
        path = path.replace(/[\n, \r]/g, '')  // Remove other signs
        fname = fname.toString().replace(/[\n, \r]/g, '')
        // Priniting results
        this.print_blank_line()
        console.log(chalk.greenBright(`\nResults from path:`, chalk.inverse(` ${path} `)))
        let files = this.get_files(path, fname, strict_finding_mode)

        if (files.length > this.max_file_list_length) {
            console.log(chalk.redBright('\nTry to specify the file name more precisely.\nToo many files found.',
            chalk.inverse(` ${files.length} `)))
            this.print_blank_line()
            this.data_list.file_list = null
            this.data_list.file_list_has_updated = false
        } else if (files.length > 0) {
            files = files.sort()

            // Update data_list
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
        this.set_data(this.data_list)
        console.log()
    }

    goto_path(id) {
        // Goto some path
        this.data_list = this.get_data()
        this.print_blank_line()
        if (this.data_list.file_list != null) {
            if (id <= this.data_list.file_list.length) {
                let path = this.data_list.file_list[id-1]
                if (this.data_list.file_list_has_updated)
                {
                    console.log('\n' + chalk.greenBright(path))
                } else {
                    console.log(chalk.yellowBright('\nWarning! You should update file list, by finding some file.\n'))
                    console.log(chalk.greenBright(path))
                } 
            } else {
                // Return Error
                console.log(chalk.redBright('\nError! There is no such index.'))
            }
        } else {
            // Return Error
            console.log(chalk.redBright('\nError! File list is empty.'))
        }
        this.data_list.file_list_has_updated = false
        this.set_data(this.data_list)
        this.print_blank_line()
        console.log()
    }
}


module.exports = FileFinder
