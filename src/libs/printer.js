const chalk = require('chalk')

class Printer {

    constructor({ file_list, error, warning }) {
        this.file_list = file_list
        this.error = error
        this.warning = warning
    }

    print_error(err) {
        const str = `   Error: ` + err + `!   `
        const toprint = chalk[this.error](str)
        this.blank_line_wrapper(str, () => {
            console.log(toprint)
        })
    }

    blank_line_wrapper(str, fn) {
        const blank_line = this.blank_line_len_from_str(str)
        console.log()
        console.log(blank_line)
        fn()
        console.log(blank_line)
    }
    
    blank_line_len_from_str(str) {
        let line = []
        for (let i = 0; i < str.length; i++)
            line.push('-')
        return line.join('')
    }

}

module.exports = Printer
