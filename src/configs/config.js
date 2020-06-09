const config = {

    cliCommands: [  // All custom supported CLI commands
        { cmd: 'find', alias: 'f', text: '<fname>' },
        { cmd: 'goto', alias: 'g', text: '' },
        { cmd: 'last', alias: 'l', text: '<id>' },
        { cmd: 'programs', alias: 'prs', text: '' },
    ],

    dataList: {  // Data format
        file_list_has_updated: false,  // Is file list updated - bool
        file_list: [],  // List of paths to found files
        last_goto_path: ''  // Path to last goto file
    },

    maxFileListLength: 30,  // Max length of found file list

    cliColors: {  // Colors
        fileList: [ 'cyan', 'magenta', 'yellow' ],
        error: 'red',
        warning: 'yellow',
        success: 'green'
    },

}

module.exports = config
