const chalk = require('chalk')


class Printer {

    constructor({ fileList, error, warning, success }) {
        this.fileListColors = fileList
        this.error = error
        this.warning = warning
        this.success = success
    }

    printError(err) {
        const str = `   Error: ` + err + `!`
        const toPrint = chalk[this.error](str)

        console.log()
        console.log(toPrint)
    }

    printWarning(title, text, other) {
        const t = `   Warning: ` + title + `!`
        const toPrint = chalk[this.warning](`${t} ${text}.${other}`)

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
            process.stdout.write(chalk[pickedColor]('>'))
            console.log()

            if (c >= this.fileListColors.length - 1)
                c = 0
            else
                c++
        }
    }

    printSuccess(t) {
        const toPrint = `   ` + chalk[this.success](t)

        console.log()
        console.log(toPrint)
    }

    printSimilarCommands(cmds) {
        console.log()
        if (cmds.length > 1)
            console.log('The most similar commands are: ')
        else
            console.log('The most similar command is: ')

        for (let c of cmds) {
            console.log(`   wis ${c.cmd}|${c.alias} ${c.text}`)
        }
    }

}

module.exports = Printer
