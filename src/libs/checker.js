class Checker {

    constructor() {
        this.path = /^((((\.)|(\.\.))([\\/]))+|([A-Z]:([\\/]){2}))(.([\\/])?)*$/
        this.fullPathStarts = /^\w:/
    }

    validateFileName(fname) {
        let isValid = true

        try {
            const r = new RegExp(fname)
        } catch {
            isValid = false
        }

        return isValid
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
