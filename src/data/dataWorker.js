const fs = require('fs')

class DataWorker {

    constructor() {
        this.dataFilePath = this.getDataFilePath()
    }

    getData() {
        /* Get data from json file */
        let data = fs.readFileSync(this.dataFilePath, 'utf8')
        data = JSON.parse(data)
        return data
    }

    setData(data) {
        /* Save data in json file */
        data = JSON.stringify(data, null, '    ')
        fs.writeFileSync(this.dataFilePath, data, 'utf8')
    }

    getDataFilePath() {
        return `${__dirname}\\data.json`  // Data file path
    }
    
}

module.exports = DataWorker
