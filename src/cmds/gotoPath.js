const childProcess = require('child_process'),
      { prompt } = require('inquirer')


const DataWorker = require('../data/dataWorker'),
      Printer = require('../libs/printer'),
      config = require('../configs/config')


class GotoPath {
    constructor() {
        this.dataList = config.dataList
    }

    _openFile(printer, dataWorker, id) {
        const files = this.dataList.file_list
        let path
        if (id >= 0 && id <= files.length - 1) {
            path = files[id].join('')

            this.dataList = {
                file_list: files,
                file_list_has_updated: false
            }
            dataWorker.setData(this.dataList)

            printer.printSuccess(`Opening file from path: ${path} ...`)

            childProcess.execSync(`start ${path}`)
        } else {
            printer.printError('Invalid file ID from the file list')
        }
    }

    go(id) {
        const dataWorker = new DataWorker()
        const printer = new Printer(config.fileListColors)

        this.dataList = dataWorker.getData()

        if (this.dataList.file_list_has_updated) {
            this._openFile(printer, dataWorker, id)
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
                    this._openFile(printer, dataWorker, id)
            })
        }
    }
}

module.exports = GotoPath
