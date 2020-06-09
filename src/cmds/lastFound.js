const DataWorker = require('../data/dataWorker'),
      Printer = require('../libs/printer'),
      config = require('../configs/config')

class LastFound {
    constructor() {
        this.dataList = config.dataList
    }

    get() {
        const dataWorker = new DataWorker()
        const { file_list } = dataWorker._getData()
        const printer = new Printer(config.cliColors)

        this.dataList = {
            file_list_has_updated: true,
            file_list: file_list
        }

        dataWorker._setData(this.dataList)

        if (file_list.length)
            printer.printFileList(file_list)
        else
            printer.printWarning(
                'Last found file list is clear',
                'Use <wis find|f> command to find files'
            )
    }
}

module.exports = LastFound
