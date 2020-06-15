const DataWorker = require('../data/dataWorker'),
      Printer = require('../libs/printer'),
      config = require('../configs/config')

class LastFound {

    get() {
        const dataWorker = new DataWorker()
        const printer = new Printer(config.cliColors)

        const files = dataWorker.getFileList()
        dataWorker.setIsFileListUpdated(true)

        if (files.length) {
            printer.printFileList(files)
            return
        }

        printer.printWarning(
            'Last found file list is clear',
            'Use <wis find|f> command to find files',
            ''
        )
    }

}

module.exports = LastFound
