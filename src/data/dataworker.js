const Tokens = require('../libs/tokens')

class DataWorker {

    get_data() {
        /* Get data from json file */
        let data = fs.readFileSync(Tokens.data_path, "utf8")
        data = JSON.parse(data)
        return data
    }

    set_data(data) {
        /* Save data in json file */
        data = JSON.stringify(data, null, '    ')
        fs.writeFileSync(Tokens.data_path, data, "utf8")
    }

    get_data_file_path() {
        const data_path = `${__dirname}\\data\\data.json`  // Data file path

        return data_path
    }
    
}

module.exports = DataWorker
