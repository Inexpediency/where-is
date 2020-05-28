const DataWorker = require('../data/dataWorker'),
      Checker = require('./checker'),
      Printer = require('./printer'),
      childProcess = require('child_process'),
      fs = require('fs'),
      config = require('../app/config')


class FileFinder {

    constructor(startPath) {
        this.strictMode = false  // Finding without strict mode
        this.dataList = config.dataList  // Init data list
        this.findFnameRegex = null
        this.path = this._configPath(startPath)
    }

    _configPath(startPath) {
        if (!startPath) {
            let path = childProcess.execSync('echo %CD%').toString();  // Take current path
            path = path.replace(/[\n, \r]/g, '')  // Remove other signs
            return path
        }

        const checker = new Checker()
        if (checker.isFullPath(startPath))
            return startPath

        let path = childProcess.execSync('echo %CD%').toString();  // Take current path
        path = path.replace(/[\n, \r]/g, '')  // Remove other signs

        const slash_type = '\\'

        if (--startPath.split('/').length)
            startPath = startPath.replace(/\//g, slash_type)
                
        let start_path_starts = startPath.slice(0, 2)
        
        let toTransformPath = true
        while (toTransformPath) {
            if (start_path_starts === '..') {
                let dirs = path.split(slash_type)
                path = dirs.slice(0, dirs.length - 1).join(slash_type)
                startPath = startPath.slice(3)
            } else if (start_path_starts === `.${slash_type}`) {
                startPath = startPath.slice(2)
            } else 
                toTransformPath = false

            start_path_starts = startPath.slice(0, 2)
        }
        
        path += slash_type + startPath

        if (path[path.length-1] === '\\')
            path = path.slice(0, path.length-1)
                
        return path
    }

    _findFiles(path, fname) {
        let fileList = []
        let results = []

        try {
            fileList = fs.readdirSync(path)
        } catch(err) {
            // printer.print_error("Wis can can't rean private/close/system folders")
            return results
        }

        fileList.forEach((f) => {
            let filePath = path + '\\' + f
            let fileStat = fs.statSync(filePath)
            if (fileStat && fileStat.isDirectory())
                results = results.concat(this._findFiles(filePath, fname))
            else {
                const match = f.match(this.findFnameRegex)
                if (match) {
                    const pos = match.index
                    results.push([path + '\\' + f.slice(0, pos), f.slice(pos, pos + fname.length), f.slice(pos + fname.length)])
                }
            }
        })

        return results
    }

    _shieldingRegex(r) {
        r = r.split('').map((el) => {
            if (config.symbols2shielding.includes(el))
                return `\\${el}`
            return el
        })
        return r.join('')
    }

    getSimilarFiles(fname, strict_mode) {
        const printer = new Printer(config.fileListColors)

        fname = fname.toString().replace(/[\n, \r]/g, '')
        this.strictMode = strict_mode
        
        if (this.strictMode)
            this.findFnameRegex = new RegExp(`^${this._shieldingRegex(fname)}$`)
        else
            this.findFnameRegex = new RegExp(`${this._shieldingRegex(fname)}`)

        let files = this._findFiles(this.path, fname)

        if (files.length > config.maxFileListLength) {
            printer.printWarning(`Too many files found: ${files.length}`, 'Try to specify the file name more precisely')
            return
        }

        printer.printFileList(files)

        this.dataList = {
            file_list_has_updated: true,
            file_list: files
        }

        const dataWorker = new DataWorker()
        dataWorker.setData(this.dataList)
    }

}


module.exports = FileFinder 
