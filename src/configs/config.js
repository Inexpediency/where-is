const config = {

    cliCommands: [  // All custom supported CLI commands
        { cmd: 'find', alias: 'f', text: '<fname>' },
        { cmd: 'goto', alias: 'g', text: '' },
        { cmd: 'last', alias: 'l', text: '<id>' }
    ],

    dataList: {  // Data format
        file_list_has_updated: false,
        file_list: []
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
