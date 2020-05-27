const tokens = {

    // Colors to output a file lis
    colors: {
        file_list: [ 'cyan', 'magenta', 'yellow' ],
        error: 'red'
    }, 

    data_list: {  // Data format
        file_list_has_updated : false,
        file_list: null
    },

    valid_file_name: /^[\d\w\.]+$/,  // Valid file name

}

module.exports = tokens
