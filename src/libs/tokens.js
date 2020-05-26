const Tokens = {
    max_file_list_length: 30,  // Max length of finded file list
    arr_of_colors: ['cyan', 'magenta', 'yellow'],  // Colors supported chalk module

    data_list: {  // Data format
        file_list_has_updated : false,
        file_list: null
    },

    strict_finding_mode: false,  // Finding without strict mode
    valid_file_name: /^[\d|\w]+\.[a-zA-Z][a-zA-Z|\d]*$/,  // Valid file name
}

module.exports = Tokens
