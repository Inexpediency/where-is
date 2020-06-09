const fs = require('fs')

class DataWorker {

    constructor() {
        this.dataFilePath = this._getDataFilePath()
    }

    getFileList() {
        /* Returns data list */
        return this._getData().file_list
    }

    getIsFileListUpdated() {
        /* Returns is files list updated from db */
        return this._getData().file_list_has_updated
    }

    getLastGotoPath() {
        /* Returns last path users goto to */
        return this._getData().last_goto_path
    }

    setFileList(files) {
        /* Update file list in db */
        let data = this._getData()
        data.file_list = files
        this._setData(data)
    }

    setIsFileListUpdated(b) {
        /* Sets is file list updated value in db */
        let data = this._getData()
        data.file_list_has_updated = b
        this._setData(data)
    }

    setLastGotoPath(path) {
        let data = this._getData()
        data.last_goto_path = path
        this._setData(path)
    }

    _getData() {
        /* Get data from json file */
        let data = fs.readFileSync(this.dataFilePath, 'utf8')
        data = JSON.parse(data)
        return data
    }

    _setData(data) {
        /* Save data in json file */
        data = JSON.stringify(data, null, '    ')
        fs.writeFileSync(this.dataFilePath, data, 'utf8')
    }

    _getDataFilePath() {
        /* Returns path of data file */
        return `${__dirname}\\data.json`
    }
    
}

module.exports = DataWorker
