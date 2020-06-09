const childProcess = require('child_process'),
      { prompt } = require('inquirer')


const DataWorker = require('../data/dataWorker'),
      Printer = require('../libs/printer'),
      config = require('../configs/config')


class GotoPath {

    _openFile(printer, dataWorker, id, program) {
        const files = dataWorker.getFileList()
        let path
        if (id >= 0 && id <= files.length - 1) {
            path = files[id].join('')

            dataWorker.setIsFileListUpdated(false)

            if (program) {
                printer.printSuccess(`Opening file from path: ${path} with ${program}...`)
                try {
                    childProcess.execSync(`${program} "${path}"`)
                } catch (e) {
                    printer.printError('Such a program does not exist in PATH')
                }
            } else {
                printer.printSuccess(`Opening file from path: ${path}...`)
                childProcess.execSync(`"${path}"`)
            }

            dataWorker.setLastGotoPath(path)
        } else {
            printer.printError('Invalid file ID from the file list')
        }
    }

    go(id, program=null) {
        const dataWorker = new DataWorker()
        const printer = new Printer(config.cliColors)

        const fileListUpdated = dataWorker.getIsFileListUpdated()

        if (fileListUpdated) {
            this._openFile(printer, dataWorker, id, program)
        } else {
            printer.printWarning(
                'You should update file list',
                'Use <wis find|f> or <wis last|l> command to update list',
                '\n'
            )
            prompt(
                [
                    {
                        type: 'confirm',
                        name: 'confirm',
                        message: 'Are you sure you want to do this?'
                    }
                ]
            ).then(({ confirm }) => {
                if (confirm)
                    this._openFile(printer, dataWorker, id, program)
            })
        }
    }
}

module.exports = GotoPath
