const config = {

    dataFilePath: `${__dirname}\\data\\data.json`,  // Data file path

    dataList: {  // Data format
        file_list_has_updated : false,
        file_list: null
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
