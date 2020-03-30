
const commander = require('commander'),
{ prompt } = require('inquirer'),
chalk = require('chalk'),
fs = require('fs')

commander.version('1.0.0').description('Configuration files creator.')

commander
.command('create <name>')
.option('--extension <value>', 'File extension')
.alias('c')
.description('Create new configuration file.')
.action((name, cmd) => {
  if (cmd.extension && !['json', 'txt', 'cfg'].includes(cmd.extension)) {
    console.log(chalk.red('\nExtension is not allowed.'))
  } else {
    prompt([
      {
        type: 'input',
        name: 'charset',
        message: 'Charset: '
      },
      { type: 'input', name: 'max_ram_usage', message: 'Max RAM usage, Mb: ' },
      { type: 'input', name: 'max_cpu_usage', message: 'Max CPU usage, %: ' },
      { type: 'input', name: 'check_updates_interval', message: 'Updates interval, ms: ' },
      { type: 'input', name: 'processes_count', message: 'Processes count: ' }
    ]).then(options => {
      if (cmd.extension && cmd.extension === 'json') {
        fs.writeFileSync(`files/${name}.${cmd.extension}`, JSON.stringify(options))
      } else {
        let data = ''
        for (let item in options) data += `${item}=${options[item]} \n`

        fs.writeFileSync(`files/${name}.cfg`, data)
      }
      console.log(chalk.green(`\nFile "${name}.${cmd.extension || 'cfg'}" created.`))
    })
  }
})

commander
.command('all')
.alias('a')
.description('Show all configuration files.')
.action(() => {
  const files = fs.readdirSync('files')

  let data = ''
  for (let file of files) data += `${file} \n`

  console.log(chalk.grey(`\nConfiguration files: \n\n${data}`))
})

commander.parse(process.argv)