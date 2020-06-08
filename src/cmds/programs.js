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

        let path = []
        for (let p of prs) {
            if (!/win/.test(p.toLowerCase())) {
                try {
                    path.push(...this._getApplicationsFromPath(p))
                } catch (e) {}
            }
        }

        // console.log(path)

        // console.log(this._getApplicationsFromPath(prs[0]))

        // return prs
    }

    _formatPrograms(prs) {
         return prs.trim().slice(5).split(';').filter(path => path)
    }

    _getApplicationsFromPath(path) {
        let files = fs.readdirSync(path)


        files = files.filter((f) => {
            return (
                !/win/.test(f.toLowerCase()) &&
                f.slice(f.length - 4) === '.exe' &&
                !/uninstall/.test(f.toLowerCase())
            )
        })

        console.log(files)

        return files[0]
    }
}

module.exports = Programs
