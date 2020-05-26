class Printer {
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
        if (f_index_pos.length === 1)
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
}

module.exports = Printer
