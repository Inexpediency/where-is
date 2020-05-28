class Checker {

    constructor() {
        this.fileName = /^[\d\w.]+$/  // Valid file name
        this.path = /^((((\.)|(\.\.))([\\/]))+|([A-Z]:([\\/]){2}))(.([\\/])?)*$/
        this.fullPathStarts = /^\w:/
    }

    validateFileName(fname) {
        return this.fileName.test(fname)
    }

    validatePath(path) {
        if (!this.path.test(path))
            return false

        return !(--path.split('/').length > 0 && --path.split('\\').length > 0)
    }

    isFullPath(path) {
        return this.fullPathStarts.test(path)
    }

}

module.exports = Checker
