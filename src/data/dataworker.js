class DataWorker {
    get_data() {
        /* Get data from json file */
        let data = fs.readFileSync(`${__dirname}\\data.json`, "utf8")
        data = JSON.parse(data)
        return data
    }

    set_data(data) {
        /* Save data in json file */
        data = JSON.stringify(data, null, '    ')
        fs.writeFileSync(`${__dirname}\\data.json`, data, "utf8")
    }
}

module.exports = DataWorker
