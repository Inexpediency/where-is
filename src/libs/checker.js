class Checker {

    constructor() {
        this.file_name = /^[\d\w\.]+$/  // Valid file name
        this.path = /^((((\.)|(\.\.))(\\|\/))+|([A-Z]\:(\\|\/){2}))(\w(\\|\/)?)+$/
        this.full_path_starts = /^\w\:/
    }

    validate_file_name(fname) {
        return this.file_name.test(fname)
    }

    validate_path(path) {
        if (!this.path.test(path))
            return false

        if (--path.split('/').length > 0 && --path.split('\\').length > 0)
            return false

        if (path[path.length - 1] == '/' || path[path.length - 1] == '\\')
            return false

        return true
    }

    is_full_path(path) {
        return this.full_path_starts.test(path)
    }

}

module.exports = Checker
