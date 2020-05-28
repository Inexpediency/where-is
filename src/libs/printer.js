const chalk = require('chalk')


class Printer {

    constructor({ fileList, error, warning }) {
        this.fileListColors = fileList
        this.error = error
        this.warning = warning
    }

    printError(err) {
        const str = `   Error: ` + err + `!   `
        const toPrint = chalk[this.error](str)

        console.log()
        console.log(toPrint)
    }

    printWarning(title, text) {
        const t = `   Warning: ` + title + `!`
        const toPrint = chalk[this.warning](`${t} ${text}.`)

        console.log()
        console.log(toPrint)
    }

    printFileList(fileList) {
        console.log()
        let c = 0
        for (let p in fileList) {
            let path = fileList[p]
            let pickedColor = this.fileListColors[c]

            process.stdout.write(chalk[pickedColor](`[${p}] `))
            process.stdout.write(chalk[pickedColor](path[0]))
            process.stdout.write(chalk[pickedColor].inverse(path[1]))
            process.stdout.write(chalk[pickedColor](path[2]))
            console.log()

            if (c >= this.fileListColors.length - 1)
                c = 0
            else
                c++
        }
    }

}

module.exports = Printer
