const chalk = require('chalk')

class Printer {

    constructor({ fileList, error, warning }) {
        this.file_list = fileList
        this.error = error
        this.warning = warning
    }

    printError(err) {
        const str = `   Error: ` + err + `!   `
        const toPrint = chalk[this.error](str)
        this.blankLineWrapper(str, () => {
            console.log(toPrint)
        })
    }

    blankLineWrapper(str, fn) {
        const blankLine = this.blankLineLenFromStr(str)
        console.log()
        console.log(blankLine)
        fn()
        console.log(blankLine)
    }
    
    blankLineLenFromStr(str) {
        let line = []
        for (let i = 0; i < str.length; i++)
            line.push('-')
        return line.join('')
    }

}

module.exports = Printer
