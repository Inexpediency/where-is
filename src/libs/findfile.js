const childProcess = require('child_process')
const chalk = require('chalk')

const Printer = require('./printer')
const Tokens = require('./tokens')

class FileFinder {

    constructor() {
        this.strict_finding_mode = false  // Finding without strict mode
        this.data_list = Tokens.data_list  // Init data list
        this.find_fname_regex = null
    }

    get_similar_files(fname, strict_mode) {
        return 0
    }

}


module.exports = FileFinder 
