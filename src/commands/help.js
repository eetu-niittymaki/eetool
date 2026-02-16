import chalk from 'chalk'

const green = chalk.greenBright
const yellow = chalk.yellowBright
const white = chalk.whiteBright
const blue = chalk.blueBright

export const help = () => {
    console.log(`${white('eetool [CMD]')}
    ${green('--help')}\t${yellow('Get list of available commands')}
    ${green('--tabs')}\t${yellow('Converts spaces to tabs in given file:')}\n\t\t${white('eetool --tabs <file>')}
    ${green('--spaces')}\t${yellow('Converts tabs to spaces in given file:')}\n\t\t${white('eetool --spaces <file>')}
    ${green('--password')}\t${yellow('Randomnly generates a password with a default length of 24:')}\n\t\t${white('eetool --password (length) {flags}')}\n\t\t${blue('Optional flags: -c -> copy to clipboard, -s -> use special characters')}
    ${green('--image')}\t${yellow('Reformat images, optionally also resize them:')} \n\t\t${white('eetool --image <original file, i.e img.jpg> <output file and type, i.e img.png> {optional width} {optional height}')}
    `)
}