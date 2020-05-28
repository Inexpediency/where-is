const FileFinder = require('../libs/findfile'),
      Printer = require('../libs/printer'),
      Checker = require('../libs/checker')
      goto_path = require('../libs/goto_path'),
      config = require('./config')

const config_find_file_command = (cli) => {
    // wis find|f [options:--strict|-S] <fname> 
    cli.command('find <fname>')  // Command name with props name 
    .description('Search for a file from the current path.')
    .option('-s,--strict', 'Strict finding files.')
    .option('-p, --start-path <path>')
    .alias('f')  // Short name of command
    .action((fname, cmd) => { // Action
        const checker = new Checker()
        const printer = new Printer(config.file_list_colors)

        if (checker.validate_file_name(fname)) {
            const { strict, startPath } = cmd

            let strict_mode = false
            let path = ''

            if (strict)
                strict_mode = true

            if (startPath)
                if (checker.validate_path(startPath))
                    path = startPath
                else
                    printer.print_error('Invalid start path')

            const filefinder = new FileFinder(startPath)
            
            filefinder.get_similar_files(fname, strict_mode)
        } else {
            printer.print_error('Invalid file name')
        }
    })

    return cli
}

const config_goto_path_command = (cli) => {
    // wis take|t <id>
    cli.command('take <id>')
    .description('Go to file path with this id.')
    .alias('t')
    .action((id) => {
        goto_path(id)
    })

    return cli
}

const config_cli = (cli) => {
    // wis --version|-V
    // wis --help|-h
    cli.version('1.1.0')
        .description('Files finder from current path.')  // Util name and description
    
    cll = config_find_file_command(cli)
    cli = config_goto_path_command(cli)

    return cli
}

const run = () => {
    let commander = require('commander')

    commander = config_cli(commander)
    commander.parse(process.argv)  // Take array of string for parsing
}

module.exports = run
