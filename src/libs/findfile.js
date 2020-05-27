const DataWorker = require('../data/dataworker'),
      Printer = require('./printer'),
      childProcess = require('child_process'),
      config = require('../app/config')

class FileFinder {

    constructor() {
        this.strict_mode = false  // Finding without strict mode
        this.data_list = config.data_list  // Init data list
        this.find_fname_regex = null
        this.dataworker = new DataWorker(config.data_file_path)
        this.path = this.config_path()
    }

    config_path() {
        let path = childProcess.execSync('echo %CD%').toString();  // Take current path
        path = path.replace(/[\n, \r]/g, '')  // Remove other signs
        
        return path
    }

    get_similar_files(fname, strict_mode) {
        fname = fname.toString().replace(/[\n, \r]/g, '')
        this.strict_mode = strict_mode
        
        if (this.strict_mode)
            this.find_fname_regex = new RegExp(`^${fname}$`)
        else
            this.find_fname_regex = new RegExp(`${fname}`)

        

        return 0
    }

}


module.exports = FileFinder 
