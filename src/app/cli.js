const FileFinder = require('../libs/findfile'),
      Printer = require('../libs/printer'),
      DataWorker = require('../data/dataworker'),
      tokens = require('../libs/tokens')

let filefinder = new FileFinder()
let dataworker = new DataWorker()
let printer = new Printer(tokens.colors)

const config_cli = (cli) => {
    
    // wis --version|-V
    // wis --help|-h
    cli.version('1.1.0')
        .description('Files finder from current path.')  // Util name and description
    
    // wis find|f [options:--strict|-S] <fname> 
    cli.command('find <fname>')  // Command name with props name 
        .description('Search for a file from the current path.')
        .option('-S,--strict', 'Strict finding files.')
        .alias('f')  // Short name of command
        .action((fname, cmd) => { // Action

            console.log(dataworker.get_data_file_path())

            if (tokens.valid_file_name.test(fname)) {
                console.log('yep')
                
                let strict_mode = false
                if (cmd.strict)
                    strict_mode = true

                filefinder.get_similar_files(fname, strict_mode)
            } else {
                printer.print_error('Invalid file name')
            }

        })

    // wis take|t <id>
    cli.command('take <id>')
        .description('Go to file path with this id.')
        .alias('t')
        .action((id) => {
            filefinder.goto_path(id)
        })

    return cli
}

const run = () => {
    let commander = require('commander')

    commander = config_cli(commander)
    commander.parse(process.argv)  // Take array of string for parsing
}

module.exports = run
