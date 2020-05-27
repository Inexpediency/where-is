const config = {

    data_file_path: `${__dirname}\\data\\data.json`,  // Data file path

    data_list: {  // Data format
        file_list_has_updated : false,
        file_list: null
    },

    max_file_list_length: 30,  // Max length of finded file list

    file_list_colors: {
        file_list: [ 'cyan', 'magenta', 'yellow' ],
        error: 'red',
        warning: 'yellow'
    }, 

}

module.exports = config
