const DataWorker = require('../data/dataWorker'),
      Printer = require('../libs/printer'),
      config = require('../app/config')

class LastFound {
    constructor() {
        this.dataList = config.dataList
    }

    get() {
        const dataWorker = new DataWorker()
        const { file_list } = dataWorker.getData()
        const printer = new Printer(config.fileListColors)

        this.dataList = {
            file_list_has_updated: true,
            file_list: file_list
        }

        dataWorker.setData(this.dataList)

        printer.printFileList(file_list)
    }
}

module.exports = LastFound
