const config = {

    dataList: {  // Data format
        file_list_has_updated : null,
        file_list: []
    },

    maxFileListLength: 30,  // Max length of found file list

    fileListColors: {
        fileList: [ 'cyan', 'magenta', 'yellow' ],
        error: 'red',
        warning: 'yellow'
    },

    symbols2shielding: ['.', ':', '-', '?', '^', '$'],

}

module.exports = config
