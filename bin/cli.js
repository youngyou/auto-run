#!/usr/bin/env node
const chalk = require('chalk');

function run(argv) { // const {v, win32, darwin, linux, script} = argv;
    if(argv.v) {
        const pkgJson = require('../package.json');
        console.log(`version: ${pkgJson.version}`);
        process.exit(0);
    }
    const platform = require('os').platform();
    const scriptName = argv[platform] || (argv.script || '').replace('*', platform);
    if(!scriptName) {
        console.log(chalk.red('error'), `You must set either \`script\` or \`--${platform}\``);
        process.exit(0);
    }
    const path = require('path');
    // const child_process = require('child_process');
    const readPkg = require("read-pkg");
    const crossSpawn = require("cross-spawn")
    const pkgPath = path.join(process.cwd(), 'package.json');
    
    readPkg(pkgPath).then(pkg => {
        if(pkg.scripts && pkg.scripts[scriptName]) {
            console.log(chalk.gray(`> npm run "${scriptName}"`));
            crossSpawn('npm', ['run', scriptName], { stdio: 'inherit' });
        } else {
            console.log(chalk.gray('> ' + scriptName));
            const args = scriptName.split(' ');
            crossSpawn(args.shift(), args, { stdio: 'inherit' })
        }
    });
}

require('yargs')
    .usage('Usage: $0 [script] [options]')
    // .command('count', 'Count the lines in a file')
    .example('$0 --windows serve:windows --darwin serve:darwin --linux serve:linux', 'run the serve script by platform')
    .example('$0 serve:*', 'run the serve script by platform')
    .option('win32', {
        alias: ['w', 'windows'],
        type: 'string',
        description: 'script or name for windows'
    })
    .option('darwin', {
        alias: ['m', 'mac'],
        type: 'string',
        description: 'script or name for mac'
    })
    .option('linux', {
        alias: ['l'],
        type: 'string',
        description: 'script or name for linux'
    })
    .command('$0 [script] [options]', 'run the script(or name) by platform', () => {}, run)
    .help('help')
    .alias('help', 'h')
    .epilog('copyright 2019')
    .argv;