import chalk from 'chalk'

const green = chalk.greenBright
const yellow = chalk.yellowBright
const white = chalk.whiteBright
const blue = chalk.blueBright

export const help = () => {
    console.log(`${white('eetool [CMD]')}
    ${green('--help')}\t${white('eetool --help')}\n\t\t${yellow('Get list of available commands')}
    ${green('--tabs')}\t${white('eetool --tabs <file>')}\n\t\t${yellow('Converts spaces to tabs in given file:')}
    ${green('--spaces')}\t${white('eetool --spaces <file>')}\n\t\t${yellow('Converts tabs to spaces in given file:')}
    ${green('--password')}\t${white('eetool --password {length} {flags}')}\n\t\t${yellow('Randomnly generates a password with a default length of 24:')}\n\t\t${blue('Optional flags: -c -> copy to clipboard, -s -> use special characters')}
    ${green('--image')}\t${white('eetool --image <infile, i.e img.jpg> <outfile, i.e img.png> {width} {height}')}\n\t\t${yellow('Reformat images, optionally also resize them if width and height given')}
    `)
}