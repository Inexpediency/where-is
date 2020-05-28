const DataWorker = require('../data/dataworker'),
      Checker = require('./checker'),
      Printer = require('./printer'),
      childProcess = require('child_process'),
      fs = require('fs'),
      config = require('../app/config')

class FileFinder {

    constructor(start_path) {
        this.strict_mode = false  // Finding without strict mode
        this.data_list = config.data_list  // Init data list
        this.find_fname_regex = null
        this.dataworker = new DataWorker(config.data_file_path)
        this.path = this.config_path(start_path)
    }

    config_path(start_path) {
        if (!start_path) {
            let path = childProcess.execSync('echo %CD%').toString();  // Take current path
            path = path.replace(/[\n, \r]/g, '')  // Remove other signs
            return path
        }

        const checker = new Checker()
        if (checker.is_full_path(start_path))
            return start_path

        let path = childProcess.execSync('echo %CD%').toString();  // Take current path
        path = path.replace(/[\n, \r]/g, '')  // Remove other signs

        const slash_type = '\\'

        if (--start_path.split('/').length)
            start_path = start_path.replace(/\//g, slash_type)
                
        let start_path_starts = start_path.slice(0, 2)
        
        let to_transfrom_path = true
        while (to_transfrom_path) {
            if (start_path_starts === '..') {
                let dirs = path.split(slash_type)
                path = dirs.slice(0, dirs.length - 1).join(slash_type)
                start_path = start_path.slice(3)
            } else if (start_path_starts === `.${slash_type}`) {
                start_path = start_path.slice(2)
            } else 
                to_transfrom_path = false

            start_path_starts = start_path.slice(0, 2)
        }
        
        path += slash_type + start_path

        if (path[path.length-1] === '\\')
            path = path.slice(0, path.length-1)
                
        return path
    }

    _find_files(path, fname) {
        let file_list = []
        let results = []

        try {
            file_list = fs.readdirSync(path)
        } catch(err) {
            // printer.print_error("Wis can can't rean private/close/system folders")
            return results
        }

        file_list.forEach((f) => {
            let file_path = path + "\\" + f
            let file_stat = fs.statSync(file_path) 
            if (file_stat && file_stat.isDirectory())
                results = results.concat(this._find_files(file_path, fname))
            else {
                const match = f.match(this.find_fname_regex)
                if (match) {
                    const pos = match.index
                    results.push([f.slice(0, pos), f.slice(pos, pos + fname.length), f.slice(pos + fname.length)])
                }
            }
        })

        return results
    }

    _shielding_regex(r) {
        const els2shielding = ['.', ':']
        r = r.split('').map((el) => {
            if (els2shielding.includes(el))
                return `\\${el}`
            return el
        })
        return r.join('')
    }

    get_similar_files(fname, strict_mode) {
        fname = fname.toString().replace(/[\n, \r]/g, '')
        this.strict_mode = strict_mode
        
        if (this.strict_mode)
            this.find_fname_regex = new RegExp(`^${this._shielding_regex(fname)}$`)
        else
            this.find_fname_regex = new RegExp(`${this._shielding_regex(fname)}`)

        const file_list = this._find_files(this.path, fname)

        console.log(file_list)
        
        return 0
    }

}


module.exports = FileFinder 
