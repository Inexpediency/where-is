const fs = require('fs')

class DataWorker {

    constructor(df_path) {
        this.data_file_path = df_path
    }

    getData() {
        /* Get data from json file */
        let data = fs.readFileSync(this.data_file_path, "utf8")
        data = JSON.parse(data)
        return data
    }

    setData(data) {
        /* Save data in json file */
        data = JSON.stringify(data, null, '    ')
        fs.writeFileSync(this.data_file_path, data, "utf8")
    }
    
}

module.exports = DataWorker
