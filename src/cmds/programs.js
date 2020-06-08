const childProcess = require('child_process'),
    fs = require('fs')

class Programs {
    constructor() {
        this.programs = this._getPATH()
    }

    getPATHPrograms() {

    }

    _getPATH() {
        // Linux: echo $PATH | tr ":" "\n"
        // Windows: path
        let prs = childProcess.execSync('path').toString()
        prs = this._formatPrograms(prs)

        let paths = []
        for (let p of prs) {
            if (!/win/.test(p.toLowerCase()) && !/nvidia/.test(p.toLowerCase())) {
                try {
                    paths.push(...this._getApplicationsFromPath(p))
                } catch (e) {}
            }
        }

        paths = new Set(paths.sort())

        return paths
    }

    _formatPrograms(prs) {
         return prs.trim().slice(5).split(';').filter(path => path)
    }

    _getApplicationsFromPath(path) {
        let files = fs.readdirSync(path)

        files = files.filter((f) => {
            return (
                f.slice(f.length - 4) === '.exe' &&
                !/uninstall/.test(f.toLowerCase()) &&
                !(f.split('-').length - 1) &&
                !(f.split('_').length - 1) &&
                !/restarter/.test(f.toLowerCase()) &&
                !/elevator/.test(f.toLowerCase()) &&
                !/launcher/.test(f.toLowerCase())
            )
        })

        files = files.map((f) => f.slice(0, f.length - 4))

        let apps = files.slice()

        for (let i in files) {
            let r = new RegExp(files[i])
            for (let j in files) {
                if (i !== j && r.test(files[j])) {
                    apps[j] = ''
                }
            }
        }

        return apps.filter(a => a)
    }
}

module.exports = Programs
