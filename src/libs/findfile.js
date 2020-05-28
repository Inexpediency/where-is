const DataWorker = require('../data/dataworker'),
      Checker = require('./checker'),
      Printer = require('./printer'),
      childProcess = require('child_process'),
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
        const checker = new Checker()
        if (checker.is_full_path(start_path))
            return start_path

        let path = childProcess.execSync('echo %CD%').toString();  // Take current path
        path = path.replace(/[\n, \r]/g, '')  // Remove other signs

        let slash_type = '\\'

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
        
        return path
    }

    // get_files(start_path, fname) {
    //     /* Get files in this dir */
    //     this.need_regex = false
    //     if (fname.split('*').length > 1) {
    //         this.need_regex = true
    //     }
    //     let results = []
    //     let file_list = []

    //     // Method fs.readdirSync() can't rean private/close/system folders
    //     try {
    //         file_list = fs.readdirSync(start_path)
    //     }
    //     catch(err) {
    //         file_list = null
    //     }

    //     // Recursive walk in dirs
    //     if (file_list != null)
    //         file_list.forEach((file) => {
    //             let file_path = start_path + "\\" + file 
    //             let file_stat = fs.statSync(file_path) 
    //             if (file_stat && file_stat.isDirectory()) {
    //                 // Find in this dir
    //                 results = results.concat(this.get_files(file_path, fname))
    //             } else {
    //                 if (!this.need_regex) {
    //                     let entries = 0
    //                     if (this.strict_finding_mode) {
    //                         let file_name = file_path.toString().split('\\').pop()
    //                         entries = file_name.split(fname).length - 1 // Number of entries
    //                     } else {
    //                         let file_name = file_path.toString().split('\\').pop().toLowerCase()
    //                         entries = file_name.split(fname.toLowerCase()).length - 1 // Number of entries
    //                     }
    //                     if (entries > 0) {
    //                         results.push(file_path)
    //                     }
    //                 } else {
    //                     let valid_re_str
    //                     let file_name
    //                     if (this.strict_finding_mode) {
    //                         file_name = file_path.split('\\').pop()
    //                         valid_re_str = fname.split('*')[0] + this.validstr
    //                         if (fname.split('*').length > 1) 
    //                             valid_re_str += fname.split('*')[1]
    //                     } else {
    //                         file_name = file_path.toString().split('\\').pop()
    //                         valid_re_str = fname.split('*')[0].toLowerCase() + this.validstr + fname.split('*')[1].toLowerCase()
    //                     }
    //                     let re = new RegExp(valid_re_str)
    //                     this.regex = re
    //                     if (re.test(file_path)) {
    //                         results.push(file_path)
    //                     }
    //                 }
                        
    //             }
    //         })
    //     return results  // Array of file's paths
    // }

    get_similar_files(fname, strict_mode) {
        fname = fname.toString().replace(/[\n, \r]/g, '')
        this.strict_mode = strict_mode
        
        if (this.strict_mode)
            this.find_fname_regex = new RegExp(`^${fname}$`)
        else
            this.find_fname_regex = new RegExp(`${fname}`)
            
        console.log(this.path)

        return 0
    }

}


module.exports = FileFinder 
