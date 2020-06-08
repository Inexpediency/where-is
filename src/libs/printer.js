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

        if (!fileList.length) {
            this.printWarning('No files found', 'Try again', '')
        }

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

    _spaceCount(s, size) {
        let spaces = ''
        for (let i = 0; i < size - s.length; i++) {
            spaces += ' '
        }
        return s + spaces
    }

    _maxLength(arr) {
        let max = 0
        for (let i of arr) {
            if (i.length > max) {
                max = i.length
            }
        }
        return max
    }

    printPATHPrograms(programs) {
        let i = 0
        const maxlen = this._maxLength(programs)
        while (i + 2 < programs.length) {
            let p1 = chalk[this.fileListColors[0]](this._spaceCount(programs[i], maxlen))
            let p2 = chalk[this.fileListColors[1]](this._spaceCount(programs[i+1], maxlen))
            let p3 = chalk[this.fileListColors[2]](this._spaceCount(programs[i+2], maxlen))
            console.log(
                `${p1}     ${p2}     ${p3}`
            )
            i += 3
        }

        let other = programs.length % 3
        if (other) {
            i = 0
            let toPrint = ''
            while (i < other) {
                toPrint += chalk[this.fileListColors[i]](programs[programs.length - 1 + i]) + '\t'
                i++
            }
            console.log(toPrint)
        }
    }
}

module.exports = Printer
