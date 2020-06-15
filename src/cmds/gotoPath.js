const childProcess = require('child_process'),
      { prompt } = require('inquirer')


const DataWorker = require('../data/dataWorker'),
      Printer = require('../libs/printer'),
      config = require('../configs/config')


class GotoPath {

    _openFile(printer, dataWorker, id, program) {
        const files = dataWorker.getFileList()
        let path
        if ((id >= 0 && id <= files.length - 1) || (id === 'last')) {
            if (id === 'last')
                if (dataWorker.getLastGotoPath()) {
                    path = dataWorker.getLastGotoPath()
                }
                else {
                    printer.printError('Your last goto path is empty')
                    return
                }
            else
                path = files[id].join('')

            dataWorker.setIsFileListUpdated(false)

            if (program) {
                printer.printSuccess(`Opening file from path: ${path} with ${program}...`)
                try {
                    childProcess.exec(`${program} "${path}"`, { timeout:3000 })
                } catch (e) {
                    printer.printError('Such a program does not exist in PATH or there was some error')
                }
            } else {
                printer.printSuccess(`Opening file from path: ${path}...`)
                childProcess.exec(`"${path}"`, { timeout:3000 })
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

    getLastGotoPath() {
        const printer = new Printer(config.cliColors)
        const dataWorker = new DataWorker()
        const lastGotoPath = dataWorker.getLastGotoPath()

        if (lastGotoPath)
            printer.printSuccess(`Last goto path: ${lastGotoPath}`)
        else
            printer.printWarning(
                'Your last goto path is empty',
                'Use <wis goto|g> to open some file',
                ''
            )
    }
}

module.exports = GotoPath
